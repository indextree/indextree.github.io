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

이론 컴퓨터과학에서 `sum-check protocol`은 아주 중요한 이론적 토대입니다.
다항식 $g$에 대해

$$
H \stackrel{?}{=} \sum_{x \in \{0,1\}^v} g(x)
$$
라는 주장을 짧은 상호작용으로 검증해 주며, 이 아이디어는 GKR, 다양한 IOP/PIOP, SNARK 설계의 핵심 subroutine으로 이어집니다.

그런데 전통적인 verifiable computation 생태계에는 매우 큰 전제가 하나 있습니다.

> **연산이 정확해야 합니다.**

즉, prover와 verifier가 수행하는 덧셈과 곱셈이 정확해야 하고, 다항식 일치 여부도 정확한 등식으로 검사합니다.
문제는 현실의 계산, 특히 과학 계산, 머신러닝, 수치 연산이 대부분 그렇게 작동하지 않는다는 점입니다. 논문이 강조하듯이 실수 계산은 본질적으로 부동소수점과 반올림 오차를 동반하며, 연산 순서가 달라지면 결과도 달라질 수 있습니다. GPU나 병렬 환경에서는 같은 프로그램을 두 번 실행해도 연산 순서가 조금 달라져 결과가 달라질 수 있습니다. 즉, **현실의 수치 계산은 태생적으로 approximate**합니다. 이 논문은 바로 그 간극을 정면으로 겨냥합니다.

논문의 핵심 메시지는 다음과 같습니다.

- 기존 방식:  
  “원래 하고 싶은 근사 계산”을 억지로 **정확한 유한체 계산**으로 바꾸고, 그 정확한 계산을 증명합니다.
- 이 논문:  
  **sum-check 자체를 근사적으로 일반화**하여, 프로토콜이 처음부터 approximation을 받아들이도록 만듭니다.

이 점이 중요한 이유는 soundness 분석의 중심 도구가 더 이상 “어떤 0이 아닌 다항식은 영점을 많아야 $d$개만 가진다”라는 대수적 사실에만 머무르지 않기 때문입니다. 이제는 **저차 다항식의 sublevel set**, 즉 $|p(x)|$가 작은 점들의 집합을 제어하는 해석학적 도구, 곧 **Remez inequality**류가 중심에 놓이게 됩니다.

이번 글에서는 그러한 전환이 왜 필요한지, 그 motivation을 먼저 살펴보겠습니다.

---

## 1. 고전 sum-check protocol: 무엇을 검증할까요?

고전 sum-check는 다음 명제를 검증합니다.

$$
H = \sum_{(b_1,\dots,b_v)\in B^v} g(b_1,\dots,b_v),
$$
여기서

- $g$는 $v$-변수 다항식,
- 각 변수에 대한 차수는 최대 $d$,
- 보통 $B=\{0,1\}$,
- verifier는 임의의 큰 샘플링 집합 $S$에서 무작위 점들을 뽑습니다.

이 문제는 겉보기보다 훨씬 강력합니다.  
이유는 많은 계산을 “어떤 저차 다항식의 Boolean hypercube 위 합”으로 바꿔 쓸 수 있기 때문입니다.

---

## 2. sum-check의 핵심 직관: multivariate sum을 한 변수씩 처리하기

합

$$
\sum_{b_1,\dots,b_v \in B} g(b_1,\dots,b_v)
$$
를 한 번에 검증하는 대신, 각 라운드에서 “한 변수만 남겨 둔 부분합 다항식”을 prover가 보내도록 합니다.

### Round 1

prover는 다음을 보냅니다.

$$
p_1(x) \stackrel{?}{=} \sum_{(b_2,\dots,b_v)\in B^{v-1}} g(x,b_2,\dots,b_v).
$$
그러면 참이어야 하는 식은

$$
H = \sum_{b_1\in B} p_1(b_1).
$$
verifier는 이 식을 확인하고, 무작위 $r_1 \in S$를 뽑아 보냅니다.

### Round 2

이제 prover는

$$
p_2(x) \stackrel{?}{=} \sum_{(b_3,\dots,b_v)\in B^{v-2}} g(r_1,x,b_3,\dots,b_v)
$$
를 보냅니다. 그러면 참이어야 하는 식은

$$
p_1(r_1) = \sum_{b_2\in B} p_2(b_2).
$$
verifier는 이를 확인하고, 다시 무작위 $r_2\in S$를 보냅니다.

### 계속 반복하면

Round $k$에서는

$$
p_k(x) \stackrel{?}{=} \sum_{(b_{k+1},\dots,b_v)\in B^{v-k}} g(r_1,\dots,r_{k-1},x,b_{k+1},\dots,b_v),
$$
그리고 마지막 라운드에서는

$$
p_v(x) \stackrel{?}{=} g(r_1,\dots,r_{v-1},x).
$$
마지막에 verifier는 무작위 $r_v\in S$를 뽑아

$$
p_v(r_v) \stackrel{?}{=} g(r_1,\dots,r_v)
$$
를 직접 확인합니다.

---

## 3. 왜 이것이 작동할까요: “honest partial sum”의 chain

honest prover가 있다고 가정해 보겠습니다. 그러면 각 라운드에는 진짜로 보내야 할 다항식 $q_k$가 있습니다.

$$
q_k(x) =
\sum_{(b_{k+1},\dots,b_v)\in B^{v-k}}
g(r_1,\dots,r_{k-1},x,b_{k+1},\dots,b_v).
$$
이 $q_k$들은 서로 완벽하게 이어집니다.

$$
q_{k-1}(r_{k-1}) = \sum_{b_k\in B} q_k(b_k).
$$
즉, 첫 번째 라운드의 합 주장부터 마지막 직접 evaluation까지 하나의 긴 telescoping chain이 형성됩니다.
sum-check는 바로 이 체인을 prover에게 단계적으로 증명하게 만드는 프로토콜입니다.

---

## 4. classical soundness의 원리: Schwartz-Zippel / Factor Theorem

고전 soundness 증명의 핵심은 놀랄 만큼 간단합니다.

만약 어떤 라운드에서 prover가 거짓 다항식 $p_k\neq q_k$를 보냈다면,
difference polynomial

$$
h_k(x)=p_k(x)-q_k(x)
$$
는 zero polynomial이 아닌 차수 $\le d$의 univariate polynomial입니다.

그렇다면 일변수 다항식의 기본 성질에 의해 $h_k$가 0이 되는 점은 많아야 $d$개입니다.
따라서 무작위 $r_k\in S$에 대해

$$
p_k(r_k)=q_k(r_k)
$$
가 우연히 성립할 확률은 많아야

$$
\frac{d}{|S|}.
$$
이를 각 라운드에 대해 union bound 하면 전체 soundness error가

$$
\frac{vd}{|S|}
$$
가 됩니다.

### 핵심 포인트

고전 sum-check의 soundness는 본질적으로 다음 명제에 기반합니다.

> **서로 다른 저차 다항식은 “정확히 같은 값”을 너무 자주 가질 수 없습니다.**

---

## 5. 이 정확성 가정이 왜 근사 계산에서는 무너질까요?

이제 실수나 복소수에서 부동소수점으로 계산한다고 생각해 보겠습니다.

verifier가 실제로 검사하고 싶은 것은 예를 들어

$$
p_{k-1}(r_{k-1}) = \sum_{b_k\in B} p_k(b_k)
$$
같은 등식이지만, 현실에서는 양변을 모두 근사적으로 계산합니다.
그러면 적어도 세 가지 문제가 생깁니다.

### (1) 정직한 prover도 exact equality를 맞출 수 없습니다

정직한 prover가 보내는 $q_k$조차 부동소수점 오차 때문에 정확히 계산되지 않습니다.
verifier 역시 $q_k(r_k)$를 정확히 평가할 수 없습니다.

즉, **honest execution 자체가 exact protocol semantics를 만족하지 않습니다.**

### (2) ***미묘하게 다른 것***이 너무 많습니다

고전 Schwartz-Zippel은

$$
p(r)=q(r)
$$
같은 **정확한 일치**를 제어합니다.
하지만 근사 세계에서 진짜 보고 싶은 사건은

$$
|p(r)-q(r)| \le \delta
$$
같은 **근사적 일치**입니다.

이는 전혀 다른 질문입니다.
0이 아닌 다항식이 0이 되는 점은 많아야 $d$개라는 사실만으로는,
“다항식이 작아지는 점들이 얼마나 많을 수 있는가?”라는 질문에 바로 답할 수 없습니다.

### (3) 악의적 prover가 오류를 조금씩 줄여 갈 수 있습니다

고전 setting에서는 거짓말이 들키는 방식이 이산적입니다.

- 어떤 라운드에서 우연히 $p_k(r_k)=q_k(r_k)$가 되면 살아남고,
- 아니면 바로 탈락합니다.

그런데 approximate setting에서는 훨씬 미묘한 전략이 가능해집니다.

- 처음에는 큰 오차 $\Delta$를 가진 거짓 claim으로 시작하지만,
- 각 라운드에서 “랜덤 점에서만” 오차가 조금씩 줄어드는 $p_k$를 골라,
- 전체적으로는 큰 거짓말을 마지막 허용오차 $\delta$ 안으로 서서히 축소시키려는 전략

이 가능해집니다.

논문이 말하는 “intermediate security phenomenon”의 근본 원인이 바로 여기에 있습니다.

---

## 6. 그래서 필요한 것은 zero set이 아니라 sublevel set 제어입니다

근사 setting에서 우리가 제어하고 싶은 사건은

$$
|p(r)-q(r)| \le \delta
$$
입니다.
즉, 차이 다항식 $s(x)=p(x)-q(x)$에 대해

$$
|s(r)| \le \delta
$$
가 될 확률을 제어해야 합니다.

이는 “$s(r)=0$”의 확률을 묻는 Schwartz-Zippel 문제가 아니라,
다음과 같은 **sublevel set** 문제입니다.

$$
E_\delta := \{x : |s(x)| \le \delta\}.
$$
질문은 이제 이렇게 바뀝니다.

> **차수 $d$ 다항식이 전체 영역에서는 꽤 큰데, 어디에선가 아주 작은 값만 갖는 점들의 집합은 얼마나 클 수 있을까요?**

이 질문에 답하는 대표 도구가 바로 **Remez inequality**입니다.

---

## 7. 이 논문의 전환: algebraic soundness에서 analytic soundness로

고전 sum-check의 증명은 대수적입니다.

- 서로 다른 다항식의 차이는 zero polynomial이 아닙니다.
- 0이 아닌 다항식의 영점 개수는 제한됩니다.
- 따라서 랜덤 점에서 들킬 확률이 커집니다.

반면 이 논문은 soundness를 해석학적으로 바꿉니다.

- 다항식의 차이 $p-q$를 봅니다.
- 그 다항식이 어느 영역에서는 크게 보이는데, 랜덤 샘플링 점에서만 작아질 확률을 분석합니다.
- 이를 위해 Remez inequality와 complex-analysis 기반의 **sharp Remez inequality**를 사용합니다.

---

## 8. approximate sum-check의 기본 모습 미리 보기

논문은 적당한 metric $D$가 주어진 integral domain $U$ 위에서 approximate arithmetic model을 정의합니다.

각 연산은 정확한 $+$, $-$, $\times$가 아니라 오차 $\varepsilon$ 이내의 approximate gate이며,
verifier는 exact equality 대신

$$
D(u,v)\le \delta
$$
같은 근사 판정을 합니다.

그러면 검증 대상은

$$
\sum_{x\in \{0,1\}^v} g(x) \approx H
$$
가 됩니다.
여기서 $\Delta$는 “처음 claim이 실제 합에서 얼마나 벗어났는가”를 나타내는 soundness parameter이고, $\delta$는 라운드별 검증 허용오차입니다.

이 논문의 generic soundness bound는 대략 다음과 같은 형태입니다.

$$
\text{soundness error}
\;\lesssim\;
\frac{vd}{|S|}
\;+\;
\Pr\!\left[\prod_{j=1}^v \kappa(\rho_j)\le \frac{(v+1)\delta}{\Delta}\right].
$$
첫 번째 항은 고전 sum-check에서 물려받은 항이고,
두 번째 항은 “랜덤 evaluation이 반복적으로 오차를 축소시키는 사건”의 확률입니다.

이 두 번째 항을 실제로 계산해 주는 함수 $\kappa$가
실수 영역에서는 **Remez inequality**에서,
복소수 단위원에서는 **sharp Remez inequality**에서 나옵니다.

---

## 9. 왜 복소수 $\mathbb C$가 중요한가

논문은 $\mathbb R$과 $\mathbb C$를 모두 다루지만, 저자들이 특히 강조하는 점은 $\mathbb C$에서의 분석이 더 깔끔하고 강하다는 점입니다.

복소수의 경우 샘플링 집합을 단위원의 근들(roots of unity)로 잡고,
sharp Remez inequality를 써서

$$
\kappa(x)=\frac{1}{T_d\!\bigl(\csc(\pi x/2)\bigr)}
$$
라는 더 좋은 contraction control을 얻습니다.
직관적으로는 **같은 차수라면 복소수 단위원 위의 구조를 더 정밀하게 이용할 수 있다**는 뜻입니다.

이 때문에 최종 soundness 상수도 $\mathbb R$보다 $\mathbb C$에서 더 좋게 나옵니다.

---

## 10. 이 논문이 흥미로운 또 하나의 이유: black-box compiler 관점

논문은 approximate sum-check를 단순히 “새 프로토콜 하나”로 제시하지 않습니다.
저자들은 이를 **representation-oblivious compiler**처럼 바라봅니다.

즉, 프로토콜 자체는

- 실수를 어떻게 표현하는지,
- floating-point인지 fixed-point인지,
- 정확히 어떤 라이브러리로 근사 연산을 하는지

를 들여다보지 않습니다.

대신 필요한 것은 단 하나입니다.

> “각 연산이 오차 $\varepsilon$ 이내로 수행됩니다.”

이 가정만 만족하면 protocol structure는 변하지 않습니다.
이는 유한체 기반 arithmetization 접근과는 매우 다른 철학입니다.
기존 방식은 보통 precision 요구사항이 바뀌면 아예 다른 finite-field instance를 만들어야 합니다.
반면 이 논문은 **같은 프로토콜을 다른 수치 표현에 꽂아 넣을 수 있는 가능성**을 보여 줍니다.

---

## 11. 정리: 1편의 takeaway

1편에서 가져가야 할 핵심은 세 가지입니다.

### (a) 고전 sum-check의 soundness는 exact equality 위에 세워져 있습니다
차이 다항식이 0이 되는 점의 개수를 세는 Schwartz-Zippel/Factor Theorem이 핵심입니다.

### (b) approximate computation에서는 그것만으로 부족합니다
근사적 일치 $|p(r)-q(r)|\le \delta$를 다뤄야 하고, 악의적 prover는 오차를 라운드마다 조금씩 줄여 갈 수 있습니다.

### (c) 그래서 이 논문은 sublevel set를 제어하는 해석학으로 넘어갑니다
바로 **Remez inequality**와 **sharp Remez inequality**가 그 브리지입니다.

---

## 다음 글 예고

2편에서는 이 시리즈의 수학적 중심부로 들어가겠습니다.

- **Remez inequality**가 정확히 무엇인지
- 왜 Chebyshev 다항식이 극값 문제의 주인공인지
- 고전 Remez inequality의 proof sketch
- 단위원 위의 **sharp Remez inequality**가 왜 더 강한지
- 그리고 이 둘이 어떻게 approximate Schwartz-Zippel lemma로 변형되는지

를 자세히 설명드리겠습니다.

---

## 참고문헌

- Dor Bitan, Zachary DeStefano, Shafi Goldwasser, Yuval Ishai, Yael Tauman Kalai, Justin Thaler,  
  *Sum-check protocol for approximate computations*, 2025.
- Carsten Lund, Lance Fortnow, Howard Karloff, Noam Nisan,  
  *Algebraic methods for interactive proof systems*, 1992.