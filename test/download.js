const { writeFile } = require("fs/promises");

const fetchJson = async (url) => await (await fetch(url)).json();

const RESOURCES = ["people", "starships", "vehicles", "species", "planets", "films"];
const URL_REG = new RegExp(
    `(?<=https://swapi.dev/api/(${RESOURCES.join("|")})/)\\d+(?=/)`
);

const planetsValueEscape = ({ key, value }) => {
    if (key === "rotation_period") {
        if (value === "unknown") {
            return undefined;
        } else {
            const n = Number(value);
            return Number.isNaN(n) ? undefined : n;
        }
    } else if (key === "orbital_period") {
        if (value === "unknown") {
            return undefined;
        } else {
            const n = Number(value);
            return Number.isNaN(n) ? undefined : n;
        }
    } else if (key === "diameter") {
        if (value === "unknown") {
            return undefined;
        } else {
            const n = Number(value);
            return Number.isNaN(n) ? undefined : n;
        }
    } else if (["climate", "terrain"].includes(key)) {
        return csvToArray(value);
    } else if (key === "surface_water") {
        if (value === "unknown") {
            return undefined;
        } else {
            const n = Number(value);
            return Number.isNaN(n) ? undefined : n;
        }
    } else if (key === "population") {
        if (value === "unknown") {
            return undefined;
        } else {
            const n = Number(value);
            return Number.isNaN(n) ? undefined : n;
        }
    }
    return value;
};

const peopleStringEscape = ({ key, value }) => {
    if (key === "height" || key === "mass") {
        if (value === "unknown") {
            return undefined;
        } else {
            const n = Number(value);
            return Number.isNaN(n) ? undefined : n;
        }
    }
    if (["eye_color", "hair_color", "skin_color"].includes(key)) {
        return value === "n/a" ? [] : value === "unknown" ? undefined : csvToArray(value);
    }
    return value;
};

const filmsStringEscape = ({ key, value }) => {
    if (["producer"].includes(key)) {
        return csvToArray(value);
    }
    return value;
};
const speciesStringEscape = ({ key, value }) => {
    if (["eye_colors", "hair_colors", "skin_colors"].includes(key)) {
        return csvToArray(value);
    }
    if (key === "average_height") {
        const n = Number(value);
        return Number.isNaN(n) ? undefined : n;
    }
    return value;
};
const starshipsStringEscape = ({ key, value }) => {
    if (["manufacturer"].includes(key)) {
        return csvToArray(value);
    }
    return value;
};

const vehiclesStringEscape = ({ key, value }) => {
    if (["manufacturer"].includes(key)) {
        return csvToArray(value);
    }
    return value;
};
const csvToArray = (value) => {
    return value.split(", ");
};
const stringEscape = ({ name, key, value }) => {
    const res = URL_REG.exec(value);
    if (Array.isArray(res)) {
        return res[0];
    }
    if (name === "films") {
        return filmsStringEscape({ key, value });
    }
    if (name === "people") {
        return peopleStringEscape({ key, value });
    }
    if (name === "planets") {
        return planetsValueEscape({ key, value });
    }
    if (name === "species") {
        return speciesStringEscape({ key, value });
    }
    if (name === "starships") {
        return starshipsStringEscape({ key, value });
    }
    if (name === "vehicles") {
        return vehiclesStringEscape({ key, value });
    }
    throw new Error(`unknown name: ${name}`);
};

(async () => {
    const writeJobs = [];
    for (const name of RESOURCES) {
        let url = `https://swapi.dev/api/${name}/`;

        const merge = [];
        while (true) {
            const response = await fetchJson(url);
            merge.push(
                ...response.results.map((r) => {
                    const obj = {
                        id: stringEscape({ name, key: "url", value: r.url }),
                    };
                    for (const key in r) {
                        if (key === "url") {
                            continue;
                        }
                        obj[key] = Array.isArray(r[key])
                            ? name === "people" && key === "species"
                                ? r[key].length === 1
                                    ? URL_REG.exec(r[key][0])[0]
                                    : undefined
                                : r[key].map((l) => {
                                      return typeof l === "string"
                                          ? stringEscape({ name, key, value: l })
                                          : l;
                                  })
                            : typeof r[key] === "string"
                            ? stringEscape({ name, key, value: r[key] })
                            : r[key] === null
                            ? undefined
                            : r[key];
                    }
                    return obj;
                })
            );
            if (response.next === null) {
                break;
            }
            url = response.next;
        }
        writeJobs.push(
            writeFile(
                `${__dirname}/opensearch/${name}.ts`,
                `export const data = ${JSON.stringify(merge)};`,
                {
                    encoding: "utf-8",
                }
            )
        );
    }
    await Promise.all(writeJobs);
})();
