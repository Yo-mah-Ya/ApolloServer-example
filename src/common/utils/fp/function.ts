export type Lazy<A> = {
    (): A;
};

export const identity = <A>(a: A): A => a;
const isFunction = (f: unknown): f is (...args: unknown[]) => unknown =>
    typeof f === "function";

export function flow<A extends ReadonlyArray<unknown>, B>(
    ab: (...a: A) => B
): (...a: A) => B;
export function flow<A extends ReadonlyArray<unknown>, B, C>(
    ab: (...a: A) => B,
    bc: (b: B) => C
): (...a: A) => C;
export function flow<A extends ReadonlyArray<unknown>, B, C, D>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D
): (...a: A) => D;
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E
): (...a: A) => E;
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F
): (...a: A) => F;
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G
): (...a: A) => G;
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H
): (...a: A) => H;
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H, I>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I
): (...a: A) => I;
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H, I, J>(
    ab: (...a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J
): (...a: A) => J;
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E, F, G, H, I, J>(
    ab: (...a: A) => B,
    bc?: (b: B) => C,
    cd?: (c: C) => D,
    de?: (d: D) => E,
    ef?: (e: E) => F,
    fg?: (f: F) => G,
    gh?: (g: G) => H,
    hi?: (h: H) => I,
    ij?: (i: I) => J
):
    | ((...a: A) => B)
    | ((...a: A) => C)
    | ((...a: A) => D)
    | ((...a: A) => E)
    | ((...a: A) => F)
    | ((...a: A) => G)
    | ((...a: A) => H)
    | ((...a: A) => I)
    | ((...a: A) => J) {
    if (!isFunction(bc)) {
        return ab;
    }
    if (!isFunction(cd)) {
        return (...a: A) => bc(ab(...a));
    }
    if (!isFunction(de)) {
        return (...a: A) => cd(bc(ab(...a)));
    }
    if (!isFunction(ef)) {
        return (...a: A) => de(cd(bc(ab(...a))));
    }
    if (!isFunction(fg)) {
        return (...a: A) => ef(de(cd(bc(ab(...a)))));
    }
    if (!isFunction(gh)) {
        return (...a: A) => fg(ef(de(cd(bc(ab(...a))))));
    }
    if (!isFunction(hi)) {
        return (...a: A) => gh(fg(ef(de(cd(bc(ab(...a)))))));
    }
    if (!isFunction(ij)) {
        return (...a: A) => hi(gh(fg(ef(de(cd(bc(ab(...a))))))));
    }
    return (...a: A) => ij(hi(gh(fg(ef(de(cd(bc(ab(...a)))))))));
}

export function pipe<A>(a: A): A;
export function pipe<A, B>(a: A, ab: (a: A) => B): B;
export function pipe<A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C;
export function pipe<A, B, C, D>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D
): D;
export function pipe<A, B, C, D, E>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E
): E;
export function pipe<A, B, C, D, E, F>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F
): F;
export function pipe<A, B, C, D, E, F, G>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G
): G;
export function pipe<A, B, C, D, E, F, G, H>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H
): H;
export function pipe<A, B, C, D, E, F, G, H, I>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I
): I;
export function pipe<A, B, C, D, E, F, G, H, I, J>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J
): J;
export function pipe<A, B, C, D, E, F, G, H, I, J, K>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K
): K;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L
): L;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
    lm: (l: L) => M
): M;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
    lm: (l: L) => M,
    mn: (m: M) => N
): N;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
    lm: (l: L) => M,
    mn: (m: M) => N,
    no: (n: N) => O
): O;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
    lm: (l: L) => M,
    mn: (m: M) => N,
    no: (n: N) => O,
    op: (o: O) => P
): P;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
    lm: (l: L) => M,
    mn: (m: M) => N,
    no: (n: N) => O,
    op: (o: O) => P,
    pq: (p: P) => Q
): Q;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
    lm: (l: L) => M,
    mn: (m: M) => N,
    no: (n: N) => O,
    op: (o: O) => P,
    pq: (p: P) => Q,
    qr: (q: Q) => R
): R;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
    lm: (l: L) => M,
    mn: (m: M) => N,
    no: (n: N) => O,
    op: (o: O) => P,
    pq: (p: P) => Q,
    qr: (q: Q) => R,
    rs: (r: R) => S
): S;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J,
    jk: (j: J) => K,
    kl: (k: K) => L,
    lm: (l: L) => M,
    mn: (m: M) => N,
    no: (n: N) => O,
    op: (o: O) => P,
    pq: (p: P) => Q,
    qr: (q: Q) => R,
    rs: (r: R) => S,
    st: (s: S) => T
): T;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(
    a: A,
    ab?: (a: A) => B,
    bc?: (b: B) => C,
    cd?: (c: C) => D,
    de?: (d: D) => E,
    ef?: (e: E) => F,
    fg?: (f: F) => G,
    gh?: (g: G) => H,
    hi?: (h: H) => I,
    ij?: (i: I) => J,
    jk?: (j: J) => K,
    kl?: (k: K) => L,
    lm?: (l: L) => M,
    mn?: (m: M) => N,
    no?: (n: N) => O,
    op?: (o: O) => P,
    pq?: (p: P) => Q,
    qr?: (q: Q) => R,
    rs?: (r: R) => S,
    st?: (s: S) => T
): A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T {
    if (!isFunction(ab)) {
        return a;
    }
    if (!isFunction(bc)) {
        return ab(a);
    }
    if (!isFunction(cd)) {
        return bc(ab(a));
    }
    if (!isFunction(de)) {
        return cd(bc(ab(a)));
    }
    if (!isFunction(ef)) {
        return de(cd(bc(ab(a))));
    }
    if (!isFunction(fg)) {
        return ef(de(cd(bc(ab(a)))));
    }
    if (!isFunction(gh)) {
        return fg(ef(de(cd(bc(ab(a))))));
    }
    if (!isFunction(hi)) {
        return gh(fg(ef(de(cd(bc(ab(a)))))));
    }
    if (!isFunction(ij)) {
        return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
    }
    if (!isFunction(jk)) {
        return ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))));
    }
    if (!isFunction(kl)) {
        return jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))));
    }
    if (!isFunction(lm)) {
        return kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))));
    }
    if (!isFunction(mn)) {
        return lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))));
    }
    if (!isFunction(no)) {
        return mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))));
    }
    if (!isFunction(op)) {
        return no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))))));
    }
    if (!isFunction(pq)) {
        return op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))))));
    }
    if (!isFunction(qr)) {
        return pq(op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))))))));
    }
    if (!isFunction(rs)) {
        return qr(pq(op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))))))));
    }
    if (!isFunction(st)) {
        return rs(qr(pq(op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))))))))));
    }
    return st(rs(qr(pq(op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))))))))));
}
