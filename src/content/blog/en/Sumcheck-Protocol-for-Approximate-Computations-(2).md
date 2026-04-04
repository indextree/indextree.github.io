---
title: "Sumcheck Protocol for Approximate Computations (2)"
linkedContent: "Sumcheck-Protocol-for-Approximate-Computations-(2)"

description: "Sumcheck Protocol for Approximate Computations"
keywords: "Cryptographic Protocols"

author: "Changmin Cho"
pubDate: 2026-04-04
isDraft: false

image: "@blogImages/img2.png"
imageAlt: "Hometown"
---

## 0. What Will We Do in This Post?

As we saw in part 1, the main difficulty of approximate sum-check is no longer the question

> "Are two polynomials exactly equal?"

but rather the need to handle **approximate agreement** such as

$$
|p(r)-q(r)| \le \delta.
$$

Therefore, the real question becomes the following.

> Suppose a low-degree polynomial $p$ takes a fairly large value somewhere in the domain. How large can the probability be that $|p|$ becomes very small at a random sample point?

This is no longer the classical problem of controlling a zero set. It is the problem of controlling the size of the **sublevel set**

$$
E_c := \{x : |p(x)| \le c\}.
$$

And the main tool that answers this question is precisely the **Remez inequality**.

In this post, we will go through the following points in order.

- what the classical Remez inequality says,
- why the Chebyshev polynomial appears,
- the basic structure of the proof,
- why an even stronger statement is needed over $\mathbb C$,
- and how these inequalities lead to an approximate Schwartz-Zippel lemma.

---

## 1. Classical Remez inequality: "A polynomial cannot stay small on too large a set"

What the paper uses over the real line is the following theorem.

### Theorem (Remez inequality)

If $p$ is a real polynomial of degree $d$, $J \subset \mathbb R$ is a finite interval, and $E \subset J$ is a measurable subset, then

$$
\sup_{x\in J} |p(x)|
\le
T_d\!\left(\frac{2|J|}{|E|}-1\right)
\sup_{x\in E} |p(x)|,
$$

where

- $|J|$ denotes the length of the interval,
- $|E|$ denotes the measure of the subset,
- and $T_d$ is the Chebyshev polynomial of degree $d$.

In a rougher form, people often remember it like this:

> If a degree-$d$ polynomial is very small on a fairly large subset of an interval, then it cannot be too large on the whole interval.

### What does this inequality mean?

This theorem is very intuitive.

- The polynomial $p$ is fairly large somewhere on the whole interval $J$.
- But it is very small on the subset $E \subset J$.

Then $E$ cannot be too large. In other words,

> **A low-degree polynomial cannot keep hiding by staying small throughout a large region.**

If classical sum-check uses the statement

> "Two distinct polynomials cannot be exactly equal at a random point too often,"

then approximate sum-check needs the statement

> "Two distinct polynomials also cannot become accidentally very close at a random point too often."

The Remez inequality is the key tool that makes this second statement quantitative.

---

## 2. Why does the Chebyshev polynomial appear?

The first thing that stands out in the Remez inequality is the appearance of the Chebyshev polynomial $T_d$.

This is not cosmetic. It means that, among degree-$d$ polynomials, the one that oscillates the most violently while keeping its absolute value under control on a given set is essentially the Chebyshev polynomial.

Recall that

$$
T_d(\cos \theta)=\cos(d\theta),
$$

so on the interval $[-1,1]$ it oscillates between $-1$ and $1$ as efficiently as possible. In extremal polynomial theory, this is exactly the object that maximizes growth outside the controlled region while keeping the norm small inside it.

That is why the constant in Remez is not some vague degree-dependent constant. The exact growth rate is captured by the Chebyshev polynomial.

---

## 3. A proof sketch of the classical Remez inequality

Here I will sketch an argument close to Remez's original 1936 idea. I will omit the full technical details, but I will try to keep the logical backbone clear.

### 3.1 Normalization

Let

$$
S=[a,b], \qquad \ell=b-a,
$$

and let the good set $E \subset S$ have measure

$$
|E|=\lambda.
$$

Assume also that on $E$ we have

$$
|p(x)| \le \kappa.
$$

Then the goal is to show

$$
\max_{x\in S}|p(x)|
\le
\kappa\,\left|T_n\!\left(\frac{2\ell}{\lambda}-1\right)\right|.
$$

It is harmless to normalize and think of the case $\kappa=1$ first.

### 3.2 First build the extremizer candidate

Remez's first observation is that the extremizer candidate is essentially an affine-scaled Chebyshev polynomial placed on an interval of length $\lambda$ attached to an endpoint.

For instance, on the left endpoint interval $[a,a+\lambda]$, consider

$$
\psi(x)=T_n\!\left(\frac{2x-(2a+\lambda)}{\lambda}\right).
$$

Then on $[a,a+\lambda]$ we have $|\psi(x)|\le 1$, while at the right endpoint $x=b$ the value becomes

$$
\psi(b)=T_n\!\left(\frac{2\ell}{\lambda}-1\right).
$$

Likewise, one can build a corresponding extremizer on the right endpoint interval $[b-\lambda,b]$.

In other words, the bound is actually attainable. What remains is to show that no polynomial can ever do worse than this.

### 3.3 Fix a maximizer and split the argument by cases

Now take an arbitrary admissible polynomial $P_n$ and suppose

$$
|P_n(\xi)|=\max_{x\in S}|P_n(x)|.
$$

Remez analyzes three cases.

1. The maximizer $\xi$ lies to the right of the right end of $E$.
2. The maximizer $\xi$ lies to the left of the left end of $E$.
3. The maximizer $\xi$ lies between two connected components of $E$.

The key point is that, depending on where the maximizer lies, we compare $P_n$ against either the left-end extremizer or the right-end extremizer.

### 3.4 Choose $n+1$ interpolation nodes inside $E$

This is the most striking step in the proof.

The Chebyshev polynomial has $n+1$ alternating extremal points. Remez shows that, even if $E$ is not itself an interval, as long as it has measure at least $\lambda$, one can choose $n+1$ points inside $E$ that play the same role.

Why is this possible? Because if one scans $E$ from left to right, one can choose the points so that the cumulative measure matches the relative positions occupied by the Chebyshev alternation points inside the model interval.

Intuitively,

- the endpoint interval has the "worst possible geometry" for growth,
- and the chosen nodes let us transfer that geometry onto an arbitrary measurable set $E$.

This is what makes it possible to compare a completely general measurable set with an interval extremizer.

### 3.5 Apply Lagrange interpolation to both polynomials

Now write both the arbitrary polynomial $P_n$ and the Chebyshev extremizer through Lagrange interpolation at the selected nodes.

The overall shape is

$$
P_n(\xi)=\sum_{j=0}^n P_n(x_j) L_j(\xi),
$$

and similarly for the extremizer.

Three comparisons matter.

1. On the good set $E$, the admissible polynomial satisfies $|P_n(x_j)|\le 1$.
2. The Chebyshev extremizer takes exact alternating values $\pm 1$ at the corresponding nodes.
3. Because of the relative position of the maximizer $\xi$ and the endpoint $b$, the absolute values of the Lagrange basis terms are larger, or at least no worse, on the extremizer side.

The translated version of the original paper carries out this comparison term by term. In the numerators one uses inequalities such as $b-x_j \ge \xi-x_j$, while in the denominators one compares distances between nodes. Also, all terms on the extremizer side have the same sign, whereas an arbitrary $P_n$ has no reason to enjoy that alignment.

As a result, one gets

$$
|P_n(\xi)| \le \left|T_n\!\left(\frac{2\ell}{\lambda}-1\right)\right|.
$$

### 3.6 What if the maximizer lies in the middle?

If $\xi$ lies between two connected components of $E$, the proof splits the interval into the left part $[a,\xi]$ and the right part $[\xi,b]$.

Then one looks at the relative densities of $E$ inside those two pieces. They cannot both be smaller than $\lambda/\ell$ at the same time, so at least one side is dense enough for the previous argument to apply.

Running the endpoint comparison on that side yields the same final bound.

### 3.7 What is the key idea of this proof sketch?

The whole argument boils down to the following principle.

> Any complicated measurable set $E$ of size $\lambda$ is no more dangerous, from the point of view of extremal growth, than an endpoint interval of the same size.

And on that endpoint interval, the maximal growth is attained exactly by the affine-scaled Chebyshev polynomial.

So the real message is this.

- The extremal set is an endpoint interval.
- The extremal polynomial is a scaled Chebyshev polynomial.
- The exact constant comes from the interaction between those two objects.

---

## 4. From Remez to approximate Schwartz-Zippel: the real version

Now let $p$ be a real polynomial of degree $d$, and fix a threshold $c \ge 0$.
Consider the sublevel set

$$
E_c := \{x\in J : |p(x)|\le c\}.
$$

If we write

$$
\|p\|_J := \sup_{x\in J}|p(x)| = M,
$$

then the Remez inequality gives

$$
M \le T_d\!\left(\frac{2|J|}{|E_c|}-1\right) c.
$$

If we turn this around, it becomes an upper bound on $|E_c|$, namely, a bound on how large the region can be where the polynomial falls below the threshold $c$.

The paper packages this using a contraction function $\kappa_{\mathbb R}(\rho)$, so that roughly speaking,

$$
\frac{|E_c|}{|J|} \le \rho
\qquad \Longrightarrow \qquad
c \gtrsim \kappa_{\mathbb R}(\rho) M.
$$

Now suppose the sampling set $S$ consists of equally spaced points in the interval $J$. Then the fraction of sample points that land in $E_c$ is controlled, up to a small discretization error, by the measure fraction $|E_c|/|J|$.

The paper turns this into an approximate Schwartz-Zippel statement of the following flavor.

### Approximate Schwartz-Zippel over $\mathbb R$

If $p$ has degree at most $d$, $S$ is an equally spaced sample set, and $c$ is a threshold, then

$$
\Pr_{x\leftarrow S}[|p(x)|\le c]
\le
\min\!\left\{\rho : \kappa_{\mathbb R}(\rho) \le \frac{c}{\|p\|_J}\right\}
+ \frac{d}{|S|}.
$$

This is a very natural approximate analogue of the classical Schwartz-Zippel lemma.

- Classical Schwartz-Zippel: control the probability that $p(x)=0$.
- Approximate Schwartz-Zippel: control the probability that $|p(x)|\le c$.

So Remez is precisely the real-analytic bridge from exact soundness to approximate soundness.

---

## 5. But why is something stronger needed over the complex numbers?

The especially interesting part of the paper is that, over $\mathbb C$, it imports a stronger and more elegant theorem.

### Theorem (Sharp Remez inequality on the unit circle)

Let $P$ be a complex polynomial of degree $n$, and let $E \subset \mathbb T$ be a measurable subset of the unit circle. If

$$
\sup_{\zeta\in E}|P(\zeta)|\le 1,
$$

then for every $z\in \mathbb T$,

$$
|P(z)|
\le
T_n\!\left(\sec \frac{s}{4}\right),
\qquad s = 2\pi - |E|,
$$

where $|E|$ denotes arclength measure on the circle.

Inside the paper, this is used in the equivalent form

$$
|E| \ge 2\pi - 4\,\arccsc\!\bigl(T_n^{-1}(L)\bigr)
\quad \Longrightarrow \quad
\sup_E |P| > 1
\quad \text{whenever } |P(1)| = L.
$$

So this is the same phenomenon as before: if a degree-$n$ polynomial is large somewhere, it cannot stay uniformly tiny on too large a subset. The difference is that on the unit circle the optimal constant is sharper, and the extremal geometry can be described exactly.

---

## 6. Why is it called "sharp"?

The word **sharp** means that the theorem does not just provide some upper bound. It identifies the **exact optimal constant** and also describes the equality case.

Over the real line, the extremal configuration is Chebyshev on an interval. On the unit circle, however, one cannot simply finish by substituting $x=\cos t$. A measurable subset of the circle can be a much more complicated union of arcs, and the complex-analytic geometry is correspondingly subtler.

Tikhonov and Yuditskii identify the exact extremizer. It is

$$
P_n(z)=e^{inz/2}\,\mathfrak T_n\!\bigl(\sec(s/4)\cos(z/2)\bigr),
$$

up to the appropriate parametrization of the arc variable.

In other words, the sharp Remez inequality tells us not only that growth is possible, but also **which set is worst** and **which polynomial exactly reaches the bound**.

This level of precision is exactly why the resulting soundness constants over $\mathbb C$ are better.

---

## 7. A proof sketch of the sharp Remez inequality

The actual proof uses serious complex analysis. Here I will focus on the structural logic.

### 7.1 Recast the problem as a fixed-gap extremal problem

Let $E \subset \mathbb T$ be closed and proper, and write its complement as a union of open arcs.

The first move is to decompose the full problem into more manageable extremal subproblems.

- Fix one complementary arc $(e^{ia_0}, e^{ib_0})$ and a point $e^{ic_0}$ inside that gap.
- Among all degree-$n$ polynomials bounded by $1$ on $E$, maximize $|P(e^{ic_0})|$.
- Then allow the point inside the gap to vary.
- Finally, let the set itself vary under a measure constraint.

This way, the proof moves from

1. a local extremal problem with a fixed gap,
2. to the structure of the extremizing polynomial,
3. and then to the structure of the worst possible set.

### 7.2 Markov correction: perturb the extremizer and force a contradiction

The key tool is what the paper calls **Markov's method of correction**.

The idea is simple but powerful.

- Assume $T_n$ is an extremizer for the fixed-gap problem.
- Suppose it has some feature that a true extremizer should not have, such as a nonreal zero, a repeated zero, or a missing contact point where $|T_n|=1$.
- Build a slightly modified polynomial $Q$ by multiplying $T_n$ by a carefully chosen correction factor.
- Make sure the correction preserves the target value at the distinguished point while reducing the boundary norm on $E$.
- This contradicts extremality.

Using that device repeatedly, the authors force the extremizer into a rigid structure.

#### Step 1. There are no nonreal zeros

If the auxiliary entire function $F$ associated with the extremizer has a nonreal zero in the upper half-plane, then one can use that zero and its conjugate to build a correction that decreases the boundary magnitude while preserving the target value. That contradicts extremality.

#### Step 2. The zeros must be simple

If a zero had multiplicity greater than one, a correction factor could again flatten the polynomial near that point without hurting the objective value.

#### Step 3. Between consecutive zeros there must be a point of $E$ where $|F|=1$

If such a contact point were missing, one would gain slack on that interval, and the same correction idea would produce a better competitor.

#### Step 4. At the endpoints of the distinguished gap, the extremizer must touch $1$ exactly

If the gap endpoints failed to be active, one could slide the geometry a little and improve the objective, again contradicting extremality.

The conclusion is extremely strong.

> The extremizer must oscillate in a highly regular Chebyshev-like pattern.

Zeros and critical points alternate, contact points appear in the right places, and the gap geometry becomes rigid.

### 7.3 This is where the comb-domain representation appears

Once that structural picture is in place, the extremizer can be rewritten as a boundary-value problem for a periodic real entire function $F$.

The authors write

$$
T_n(e^{iz}) = e^{inz/2} F(z),
$$

and then invoke the Marchenko-Ostrovskii theorem to obtain a representation of the form

$$
F(z)=\cos\!\left(\frac{n}{2}\,\theta(z)\right),
$$

where $\theta$ maps the upper half-plane conformally onto a periodic $n$-regular comb domain.

### Why is the comb domain natural?

For the classical Chebyshev polynomial,

$$
T_n(x)=\cos(n\arccos x).
$$

So the Chebyshev phenomenon is already "cosine composed with an analytic change of variables."

The sharp Remez extremizer follows the same philosophy. The difference is that the controlled set is no longer a simple interval, but a subset of the unit circle with gaps. Therefore the role of $\arccos$ is replaced by a conformal map onto a comb domain.

From this viewpoint, sharp Remez is a complex-analytic generalization of the classical Chebyshev phenomenon.

### 7.4 The extremal set must eventually be $n$-regular

The next question is not just which polynomial is extremal, but which set is extremal.

The authors define the **$n$-regular extension** of a given set $E$ and show that one can enlarge $E$ to a more regular set without changing the extremizing value.

This means that one does not need to consider every complicated measurable subset of the circle. It is enough to analyze structured $n$-regular sets.

This is the complex analogue of the real-line principle that "an endpoint interval is already the worst case."

### 7.5 Multiple gaps ultimately collapse to a single gap

Now we ask: among all $n$-regular sets with fixed measure, which one is actually the worst?

Here the proof uses monotonicity of harmonic measure in the comb-domain picture.

If one shortens a slit in the comb domain, the corresponding set on the circle grows, while the extremal value can be controlled so as not to improve. Repeating this argument lets the authors remove gaps one by one.

The end result is that the worst case is essentially a **single-gap set**:

$$
E_s = \mathbb T \setminus \text{(one arc of length } s\text{)}.
$$

This is the exact analogue of the endpoint interval in the real Remez inequality.

### 7.6 In the single-gap case, the conformal map can be computed explicitly

At this point, the problem becomes explicit.

For a single-gap set, the comb domain has only one slit, so the conformal maps between the disk, the upper half-plane, and the slit domain can be written down using Mobius transforms and elementary functions.

The authors derive the relation

$$
\cosh\!\left(\frac{h_0}{2}\right)=\sec\!\left(\frac{s}{4}\right),
$$

where $h_0$ is the slit height and $s$ is the missing arclength.

Then the extremizing polynomial becomes explicit, and evaluating it at the distinguished point yields exactly

$$
\max |P(z)| = T_n\!\left(\sec \frac{s}{4}\right).
$$

That is precisely the sharp Remez bound, and the equality case follows at the same time.

### 7.7 Summarizing the logic of this proof sketch

The whole argument can be compressed into four steps.

1. Use Markov correction to force strong structural properties on the extremizer.
2. Represent that extremizer through a conformal map to a comb domain.
3. Show that the worst set can be reduced to an $n$-regular one, and then to a single-gap set.
4. Compute the single-gap case explicitly.

That is why the theorem is called **sharp**: the proof identifies not just a bound, but the exact extremal geometry behind the bound.

---

## 8. From sharp Remez to approximate Schwartz-Zippel: the complex version

Now let $p$ be a complex polynomial of degree $d$, and let

$$
E_c := \{z\in \mathbb T : |p(z)| \le c\}
$$

be the sublevel set on the unit circle.

If

$$
\|p\|_{\mathbb T} = M,
$$

then sharp Remez implies that if $|E_c|$ is too large, $p$ cannot have size $M$ elsewhere. Turning that around gives an upper bound on the arclength of $E_c$.

The paper packages the resulting contraction in the function

$$
\kappa_{\mathbb C}(\rho)=\frac{1}{T_d\!\bigl(\csc(\pi\rho/2)\bigr)}.
$$

So if a $\rho$-fraction of the circle is allowed as the small-value region, the value threshold must still be at least about $\kappa_{\mathbb C}(\rho) M$.

### Combined with roots-of-unity sampling

In the paper, the verifier samples from roots of unity. Since those points are evenly spread around the circle, arclength control turns directly into probability control.

The resulting approximate Schwartz-Zippel statement over $\mathbb C$ has the form

$$
\Pr_{z\leftarrow S}[|p(z)|\le c]
\le
\min\!\left\{\rho : \kappa_{\mathbb C}(\rho) \le \frac{c}{\|p\|_{\mathbb T}}\right\}.
$$

The notable point is that the complex version is cleaner and stronger than the real one. The geometry of the unit circle and the sharp extremal theorem together give a more precise contraction rule.

---

## 9. Why does this fit approximate sum-check so well?

This framework matches the soundness problem of approximate sum-check almost perfectly.

In one round of the protocol, let $p_k$ be the false polynomial sent by a malicious prover and $q_k$ the honest polynomial. What we must control is the probability that

$$
|p_k(r_k)-q_k(r_k)|
$$

becomes small at the random challenge point $r_k$.

If we define

$$
s_k = p_k - q_k,
$$

then this is exactly the event

$$
|s_k(r_k)| \le \delta.
$$

That is, we are asking for a bound on the probability that a low-degree polynomial becomes small at a random sample point. This is exactly what approximate Schwartz-Zippel, derived from Remez or sharp Remez, provides.

So the analytic heart of approximate sum-check is very clean.

- Classical soundness: control the probability of hitting a root.
- Approximate soundness: control the probability of landing in a sublevel set.

The latter is precisely where Remez enters.

---

## 10. The difference between the real and complex cases: why does $\mathbb C$ give better bounds?

The paper treats both settings, but it repeatedly emphasizes that the complex case yields better contraction behavior.

The reason is that the contraction function from sharp Remez,

$$
\kappa_{\mathbb C}(\rho)=\frac{1}{T_d\!\bigl(\csc(\pi\rho/2)\bigr)},
$$

is typically larger than its real analogue.

A larger $\kappa$ means that random evaluation has a harder time shrinking the discrepancy $D(p,q)$ too aggressively in a single round.

In practical terms, this means

- a malicious prover has less room to hide a false claim through gradual contraction,
- the final soundness constants are better,
- and the analysis is often cleaner when the sample set is chosen on the complex unit circle.

This is one of the reasons the paper treats $\mathbb C$ not as a technical side note, but as a genuinely favorable ambient domain.

---

## 11. Part 2 takeaways

What should we take away from this post?

### (a) The Remez inequality is the real-variable tool that controls sublevel sets

If a polynomial is large somewhere, it cannot stay tiny on too large a subset of an interval.

### (b) The Chebyshev polynomial is not an accident

It is the extremal polynomial that captures the exact growth behavior behind the inequality.

### (c) The sharp Remez inequality on the unit circle is stronger and structurally richer

Its proof reveals the exact worst-case geometry through conformal maps, comb domains, and a single-gap extremizer.

### (d) These inequalities become approximate Schwartz-Zippel lemmas

That is exactly the form needed to analyze approximate sum-check.

---

## Preview of the Next Post

In part 3, we will finally return to the protocol itself.

We will look in more detail at

- how the approximate sum-check protocol is formally defined,
- what the "intermediate security phenomenon" really means,
- how the contraction factors accumulate across rounds,
- and how the final soundness theorem is assembled.

At that point, the algebra and the analysis will come together into the full protocol picture.

---

## References

- Dor Bitan, Zachary DeStefano, Shafi Goldwasser, Yuval Ishai, Yael Tauman Kalai, Justin Thaler,  
  *Sum-check protocol for approximate computations*, 2025.
- E. Ya. Remez,  
  *Sur une propriete des polynomes de Tchebycheff*, 1936.
- S. Yu. Tikhonov, P. Yuditskii,  
  *Sharp Remez inequality and sharp Nikolskii inequality for algebraic polynomials*, 2015.