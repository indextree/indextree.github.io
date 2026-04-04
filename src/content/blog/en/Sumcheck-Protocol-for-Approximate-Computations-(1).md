---
title: "Sumcheck Protocol for Approximate Computations (1)"
linkedContent: "Sumcheck-Protocol-for-Approximate-Computations-(1)"

description: "Sumcheck Protocol for Approximate Computations"
keywords: "Cryptographic Protocols"

author: "Changmin Cho"
pubDate: 2026-04-03
isDraft: false

image: "@blogImages/img1.png"
imageAlt: "Hometown"
---

## Sumcheck Protocol for Approximate Computations

In theoretical computer science, the `sum-check protocol` is a foundational idea. Given a polynomial $g$, it allows us to verify a claim of the form

$$
H \stackrel{?}{=} \sum_{x \in \{0,1\}^v} g(x)
$$

through a short interactive process, and this idea goes on to serve as a core subroutine in GKR, various IOP/PIOP constructions, and many SNARK designs.

However, the traditional ecosystem of verifiable computation rests on one very large premise.

> **The arithmetic must be exact.**

That is, the additions and multiplications carried out by the prover and verifier must be exact, and polynomial consistency is checked through exact equalities as well.
The problem is that real-world computation, especially scientific computing, machine learning, and numerical computation, usually does not work that way. As the paper emphasizes, real-number computation inherently comes with floating-point and rounding error, and the result may change when the order of operations changes. In GPU or parallel environments, even running the same program twice can lead to slightly different operation orders and therefore slightly different outputs. In other words, **real-world numerical computation is inherently approximate**. This paper targets that gap directly.

The paper's central message is the following.

- Traditional approach:  
	Force "the approximate computation we actually want" into an **exact finite-field computation**, and then prove that exact computation.
- This paper:  
	**Generalize sum-check itself to the approximate setting**, so that the protocol accepts approximation from the start.

Why is this important? Because from this point on, the main tool in soundness analysis is no longer only the algebraic fact that "a nonzero polynomial can have at most $d$ roots." Instead, the focus shifts to analytic tools that control the **sublevel set of a low-degree polynomial** - that is, the set of points where $|p(x)|$ is small - namely, variants of the **Remez inequality**.

In this post, we will first look at why that shift is necessary.

---

## 1. What does the classical sum-check protocol verify?

The classical sum-check protocol verifies the following statement.

$$
H = \sum_{(b_1,\dots,b_v)\in B^v} g(b_1,\dots,b_v),
$$

where

- $g$ is a $v$-variate polynomial,
- the degree in each variable is at most $d$,
- typically $B=\{0,1\}$,
- and the verifier samples random points from some large sampling set $S$.

This problem is much more powerful than it first appears.  
The reason is that many computations can be rewritten as "the sum of a low-degree polynomial over the Boolean hypercube."

---

## 2. The core intuition of sum-check: handling a multivariate sum one variable at a time

Instead of verifying

$$
\sum_{b_1,\dots,b_v \in B} g(b_1,\dots,b_v)
$$

all at once, the prover sends, in each round, a partial-sum polynomial in which only one variable is left free.

### Round 1

The prover sends

$$
p_1(x) \stackrel{?}{=} \sum_{(b_2,\dots,b_v)\in B^{v-1}} g(x,b_2,\dots,b_v).
$$

Then the equation that must hold is

$$
H = \sum_{b_1\in B} p_1(b_1).
$$

The verifier checks this equation and then samples a random $r_1 \in S$.

### Round 2

Now the prover sends

$$
p_2(x) \stackrel{?}{=} \sum_{(b_3,\dots,b_v)\in B^{v-2}} g(r_1,x,b_3,\dots,b_v)
$$

and the equation that must hold becomes

$$
p_1(r_1) = \sum_{b_2\in B} p_2(b_2).
$$

The verifier checks this and then samples another random $r_2 \in S$.

### Continuing in the same way

In round $k$, the prover sends

$$
p_k(x) \stackrel{?}{=} \sum_{(b_{k+1},\dots,b_v)\in B^{v-k}} g(r_1,\dots,r_{k-1},x,b_{k+1},\dots,b_v),
$$

and in the last round,

$$
p_v(x) \stackrel{?}{=} g(r_1,\dots,r_{v-1},x).
$$

At the end, the verifier samples a random $r_v \in S$ and directly checks

$$
p_v(r_v) \stackrel{?}{=} g(r_1,\dots,r_v).
$$

---

## 3. Why does this work? The chain of "honest partial sums"

Suppose the prover is honest. Then in each round there is a genuine polynomial $q_k$ that the prover ought to send:

$$
q_k(x) =
\sum_{(b_{k+1},\dots,b_v)\in B^{v-k}}
g(r_1,\dots,r_{k-1},x,b_{k+1},\dots,b_v).
$$

These $q_k$ fit together perfectly.

$$
q_{k-1}(r_{k-1}) = \sum_{b_k\in B} q_k(b_k).
$$

So from the initial claim about the sum all the way to the final direct evaluation, we get one long telescoping chain.
The sum-check protocol is precisely a protocol that makes the prover establish this chain step by step.

---

## 4. The principle behind classical soundness: Schwartz-Zippel / the Factor Theorem

The heart of the classical soundness proof is remarkably simple.

Suppose that in some round the prover sends a false polynomial $p_k \neq q_k$.
Then the difference polynomial

$$
h_k(x)=p_k(x)-q_k(x)
$$

is a nonzero univariate polynomial of degree at most $d$.

By the basic property of univariate polynomials, $h_k$ can vanish at no more than $d$ points.
Therefore, for a random $r_k\in S$,

$$
p_k(r_k)=q_k(r_k)
$$

can happen by coincidence with probability at most

$$
\frac{d}{|S|}.
$$

Applying a union bound over the rounds gives total soundness error

$$
\frac{vd}{|S|}.
$$

### The key point

At its core, the soundness of classical sum-check relies on the following statement.

> **Two distinct low-degree polynomials cannot take exactly the same value too often.**

---

## 5. Why does this exactness assumption collapse in approximate computation?

Now suppose we compute over the reals or complexes using floating-point arithmetic.

What the verifier really wants to check is an equality such as

$$
p_{k-1}(r_{k-1}) = \sum_{b_k\in B} p_k(b_k)
$$

but in practice both sides are computed only approximately.
At least three difficulties immediately appear.

### (1) Even an honest prover cannot satisfy exact equality

Even the honest polynomial $q_k$ cannot in general be computed exactly because of floating-point error.
The verifier cannot evaluate $q_k(r_k)$ exactly either.

In other words, **honest execution itself does not satisfy the semantics of the exact protocol.**

### (2) There are too many things that are "almost the same"

The classical Schwartz-Zippel argument controls an event like

$$
p(r)=q(r)
$$

that is, **exact agreement**.
But in the approximate world, the event we actually care about is

$$
|p(r)-q(r)| \le \delta,
$$

that is, **approximate agreement**.

This is a completely different question.
The fact that a nonzero polynomial can have at most $d$ zeros does not immediately answer the question
"How large can the set of points where the polynomial becomes small be?"

### (3) A malicious prover can shrink the error little by little

In the classical setting, getting caught is discrete.

- If by coincidence we have $p_k(r_k)=q_k(r_k)$ in some round, the prover survives.
- Otherwise the prover is rejected immediately.

In the approximate setting, much subtler strategies become possible.

- Start with a false claim whose error is large, say $\Delta$.
- In each round, choose a polynomial $p_k$ whose error shrinks only at the random challenge point.
- Gradually squeeze an initially large lie into the final tolerance $\delta$.

This is exactly the source of what the paper calls the "intermediate security phenomenon."

---

## 6. So what we need is not zero sets but sublevel-set control

In the approximate setting, the event we want to control is

$$
|p(r)-q(r)| \le \delta.
$$

If we write the difference polynomial as $s(x)=p(x)-q(x)$, then we need to control the probability that

$$
|s(r)| \le \delta.
$$

This is not a Schwartz-Zippel question about the probability of $s(r)=0$.
It is a **sublevel-set** question:

$$
E_\delta := \{x : |s(x)| \le \delta\}.
$$

So the question becomes

> **If a degree-$d$ polynomial is fairly large somewhere in the domain, how large can the set of points be where it becomes very small?**

The standard tool for answering this question is precisely the **Remez inequality**.

---

## 7. The shift in this paper: from algebraic soundness to analytic soundness

The proof of classical sum-check is algebraic.

- The difference of two distinct polynomials is nonzero.
- A nonzero polynomial has only finitely many roots.
- Therefore a random point is likely to catch the lie.

By contrast, this paper makes the soundness analysis analytic.

- It studies the difference polynomial $p-q$.
- It analyzes the probability that a polynomial which is large somewhere happens to become small only at the sampled random points.
- To do so, it uses the Remez inequality and a complex-analytic variant called the **sharp Remez inequality**.

This is not just a technical substitution.
Instead of forcing approximation into exact algebra, the paper treats **approximation itself as a first-class citizen of the protocol**.

---

## 8. A first look at approximate sum-check

The paper defines an approximate arithmetic model over an integral domain $U$ equipped with a suitable metric $D$.

Each gate is no longer an exact $+$, $-$, or $\times$, but an approximate gate with error at most $\varepsilon$.
Likewise, the verifier no longer checks exact equality, but an approximate predicate of the form

$$
D(u,v)\le \delta.
$$

The object being verified therefore becomes

$$
\sum_{x\in \{0,1\}^v} g(x) \approx H.
$$

Here, $\Delta$ is the soundness parameter measuring how far the initial claim is from the true sum, and $\delta$ is the per-round verification tolerance.

The paper's generic soundness bound has roughly the following form:

$$
	ext{soundness error}
\;\lesssim\;
\frac{vd}{|S|}
\;+\;
\Pr\!\left[\prod_{j=1}^v \kappa(\rho_j)\le \frac{(v+1)\delta}{\Delta}\right].
$$

The first term is inherited from classical sum-check.
The second term is the probability of the event that repeated random evaluations keep shrinking the error.

The function $\kappa$ that quantifies this effect comes from

- the **Remez inequality** over the reals, and
- the **sharp Remez inequality** on the complex unit circle.

---

## 9. Why are the complex numbers $\mathbb C$ important?

The paper treats both $\mathbb R$ and $\mathbb C$, but the authors especially emphasize that the analysis over $\mathbb C$ is cleaner and stronger.

In the complex setting, the sample set is taken to be roots of unity on the unit circle, and the sharp Remez inequality yields the stronger contraction control

$$
\kappa(x)=\frac{1}{T_d\!\bigl(\csc(\pi x/2)\bigr)}.
$$

Intuitively, this means that for the same degree, the structure of the complex unit circle can be exploited more precisely.

As a result, the final soundness constants are better over $\mathbb C$ than over $\mathbb R$.

---

## 10. Another reason this paper is interesting: the black-box compiler viewpoint

The paper does not present approximate sum-check merely as "one more protocol."
The authors instead view it as something like a **representation-oblivious compiler**.

That is, the protocol itself does not inspect

- how real numbers are represented,
- whether the representation is floating-point or fixed-point,
- or which specific library is used to perform approximate arithmetic.

Instead, it needs only one assumption:

> "Each arithmetic operation is carried out within error $\varepsilon$."

As long as this holds, the protocol structure itself does not change.
This is a very different philosophy from finite-field-based arithmetization.
In the traditional approach, changing the precision requirement usually means building a different finite-field instance altogether.
By contrast, this paper shows the possibility of plugging the **same protocol into different numerical representations**.

---

## 11. Part 1 takeaway

There are three main points to take away from part 1.

### (a) The soundness of classical sum-check is built on exact equality

Its core engine is Schwartz-Zippel / the Factor Theorem, which counts how many points can make the difference polynomial vanish.

### (b) In approximate computation, that is not enough

We must deal with approximate agreement $|p(r)-q(r)|\le \delta$, and a malicious prover may be able to reduce the error little by little from round to round.

### (c) This is why the paper moves to analysis that controls sublevel sets

The bridge is precisely the **Remez inequality** and the **sharp Remez inequality**.

---

## Preview of the Next Post

In part 2, we move into the mathematical core of the series:

- what the **Remez inequality** actually says,
- why the Chebyshev polynomial is the star of the extremal problem,
- a proof sketch of the classical Remez inequality,
- why the **sharp Remez inequality** on the unit circle is stronger,
- and how both are turned into an approximate Schwartz-Zippel lemma.

We will go through these points in detail.

---

## References

- Dor Bitan, Zachary DeStefano, Shafi Goldwasser, Yuval Ishai, Yael Tauman Kalai, Justin Thaler,  
	*Sum-check protocol for approximate computations*, 2025.
- Carsten Lund, Lance Fortnow, Howard Karloff, Noam Nisan,  
	*Algebraic methods for interactive proof systems*, 1992.

