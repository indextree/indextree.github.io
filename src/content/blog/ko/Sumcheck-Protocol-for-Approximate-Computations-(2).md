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

## 0. 이 글에서는 무엇을 할까요?

1편에서 살펴본 것처럼, approximate sum-check의 핵심 난점은 더 이상  
“두 다항식이 정확히 같은가?”가 아니라

$$
|p(r)-q(r)| \le \delta
$$
같은 **근사적 일치**를 다뤄야 한다는 점에 있습니다.

따라서 우리가 알고 싶은 것은 다음과 같습니다.

> 어떤 저차 다항식 $p$가 전체 영역 어딘가에서는 꽤 큰 값을 가지는데,  
> 무작위로 뽑은 점에서는 $|p|$가 아주 작아질 확률은 얼마나 될까요?

이 질문은 고전적인 zero-set 질문이 아닙니다.  
이것은 **sublevel set**
$$
E_c := \{x : |p(x)| \le c\}
$$
의 크기를 제어하는 문제입니다.

그리고 그 질문에 답하는 대표 도구가 바로 **Remez inequality**입니다.

---

## 1. 고전 Remez inequality: “작은 집합에서만 작을 수는 없습니다”

논문이 사용하는 실수 버전은 다음 정리입니다.

### 정리 (Remez inequality)
$p$가 차수 $d$의 실계수 다항식이고, $J\subset \mathbb R$가 유한 구간, $E\subset J$가 measurable subset이면

$$
\|p\|_J \le
T_d\!\left(\frac{2}{\lambda_J(E)}-1\right)\|p\|_E.
$$
여기서

- $\|p\|_A := \sup_{x\in A}|p(x)|$,
- $\lambda_J(E)$는 $J$ 안에서의 정규화된 measure,
- $T_d$는 차수 $d$의 Chebyshev polynomial입니다.

좀 더 거칠게 쓰면 흔히

$$
\|p\|_J \le \left(\frac{4}{\lambda_J(E)}\right)^d \|p\|_E
$$
로 기억합니다.

### 이 부등식의 뜻

이 정리는 아주 직관적입니다.

- $p$가 구간 전체 $J$에서는 꽤 큽니다.
- 그런데 $E\subset J$ 위에서는 아주 작습니다.

그렇다면 $E$가 너무 클 수는 없습니다.  
즉, **저차 다항식은 “큰 영역 전체에서 계속 작게 숨어 있을 수” 없습니다.**

고전 sum-check가 “서로 다른 다항식은 랜덤 점에서 정확히 같기 어렵다”를 썼다면,  
approximate sum-check는 “서로 다른 다항식은 랜덤 점에서 우연히 아주 가까워지기도 쉽지 않습니다”라는 사실을 사용하게 됩니다.  
Remez inequality는 바로 그 두 번째 명제를 떠받치는 핵심 도구입니다.

---

## 2. 왜 Chebyshev polynomial이 등장할까요?

Remez-type inequality에서 Chebyshev polynomial이 등장하는 이유는 우연이 아닙니다.

Chebyshev polynomial $T_d$는 $[-1,1]$ 위에서 절댓값을 최소로 유지하면서 바깥에서 가장 빠르게 커지는 “극단적” 다항식입니다.  
예를 들어

$$
T_d(\cos \theta)=\cos(d\theta)
$$
이므로 $[-1,1]$ 위에서는 $|T_d|\le 1$,  
하지만 $x>1$로 나가면 거의 $x^d$처럼 빠르게 커집니다.

따라서 “일부 구간에서는 작고, 다른 곳에서는 가능한 한 크게” 만드는 extremal problem의 해답으로 Chebyshev가 자연스럽게 등장합니다.  
Remez inequality는 이 extremal behavior를 정확한 부등식으로 정리한 결과라고 볼 수 있습니다.

---

## 3. 고전 Remez inequality의 proof sketch

여기서는 1936년 Remes의 원래 아이디어에 가까운 proof sketch를 설명드리겠습니다.  
증명의 완전한 기술적 세부는 생략하되, 논리의 뼈대는 충분히 따라가실 수 있도록 정리해 보겠습니다.

### 3.1 정규화

구간을 $S=[a,b]$, 길이를 $\ell=b-a$,  
좋은 집합 $E\subset S$의 길이를 $\lambda$라고 두겠습니다.  
또 $|p(x)|\le \kappa$가 $E$ 위에서 성립한다고 하겠습니다.

우리가 보여야 할 것은 다음과 같습니다.

$$
\max_{x\in [a,b]} |p(x)| \le \kappa T_n\!\left(\frac{2\ell}{\lambda}-1\right).
$$
정규화해서 $\kappa=1$로 생각해도 무방합니다.

---

### 3.2 먼저 extremizer 후보를 만든다

Remez의 첫 번째 관찰은 extremizer 후보가 사실상 **끝점에 붙은 길이 $\lambda$짜리 interval**에서의 affine-scaled Chebyshev라는 점입니다.

예를 들어 왼쪽 끝 interval $[a,a+\lambda]$에서 절댓값이 1 이하인 다항식 후보는

$$
P_{n,1}(x)=T_n\!\left(\frac{2x-(2a+\lambda)}{\lambda}\right)
$$
이고, 이 다항식은 $x=b$에서

$$
T_n\!\left(\frac{2\ell}{\lambda}-1\right)
$$
를 가집니다.

마찬가지로 오른쪽 끝 interval $[b-\lambda,b]$에 붙인 후보도 있습니다.

즉, **이 bound는 실제로 달성 가능합니다.**  
이제 남은 일은 “그보다 더 큰 값은 절대 나올 수 없다”는 점을 보이는 것입니다.

---

### 3.3 최대점을 하나 고정하고, 그 위치에 따라 경우를 나눠 보겠습니다

이제 임의의 admissible polynomial $P_n$을 잡고,  
어떤 $\xi\in [a,b]$에서

$$
|P_n(\xi)| = \max_{x\in[a,b]} |P_n(x)|
$$
라고 하겠습니다.

Remes는 $\xi$의 위치에 따라 세 가지 경우를 봅니다.

1. $\xi$가 $E$의 오른쪽 끝보다 오른쪽에 있는 경우입니다.
2. $\xi$가 $E$의 왼쪽 끝보다 왼쪽에 있는 경우입니다.
3. $\xi$가 $E$의 두 connected component 사이 어딘가에 있는 경우입니다.

핵심은 **최대점이 어느 쪽에 있느냐에 따라, 왼쪽 extremizer 또는 오른쪽 extremizer를 비교 대상으로 삼을 수 있다**는 점입니다.

---

### 3.4 $E$ 안에서 $n+1$개의 interpolation node를 뽑아 보겠습니다

이 증명에서 가장 인상적인 부분은 바로 여기입니다.  
Chebyshev 다항식은 extremal interval 안에 $n+1$개의 alternation point를 가집니다.  
Remes는 $E$가 꼭 interval이 아니어도, $E$의 measure가 $\lambda$ 이상이라는 사실만 이용해 **비슷한 역할을 하는 $n+1$개의 점**을 $E$ 안에서 골라냅니다.

왜 이것이 가능할까요?  
$E$를 왼쪽에서 오른쪽으로 훑으면서 “누적 measure”가 Chebyshev alternation point들이 interval 안에서 차지하는 상대 위치와 맞도록 점들을 선택하면 되기 때문입니다.

직관적으로 보면 다음과 같습니다.

- $E$가 interval이 아니더라도,
- 총 measure가 $\lambda$만큼 있으므로,
- extremal interval $[a,a+\lambda]$에 있던 alternation structure를 measure-preserving하게 $E$ 안으로 옮겨 심을 수 있습니다.

이 단계 덕분에 “아무 measurable set $E$”를 “끝 interval”과 비교할 수 있게 됩니다.

---

### 3.5 Lagrange interpolation을 양쪽에 적용해 보겠습니다

이제 선택한 $n+1$개의 점 $x_1,\dots,x_{n+1}$에 대해

- extremizer 후보 $P_{n,1}$를 $b$에서 평가한 값,
- 임의의 admissible polynomial $P_n$를 $\xi$에서 평가한 값

을 각각 Lagrange interpolation formula로 씁니다.

형태는 대략

$$
P(\xi)
=
\sum_{i=1}^{n+1}
P(x_i)\,\ell_i(\xi)
$$
입니다.

여기서 중요한 비교는 세 가지입니다.

1. admissible polynomial은 $E$ 위에서 $|P_n(x_i)|\le 1$입니다.
2. Chebyshev extremizer는 선택한 비교점들에서 정확히 alternating sign으로 $\pm 1$을 가집니다.
3. 최대점 $\xi$와 end-point $b$의 상대 위치 때문에 Lagrange basis의 절댓값은 extremizer 쪽이 더 크거나 적어도 나쁘지 않습니다.

원 논문 번역본은 이 비교를 항별로 수행합니다. 분자에서는 $b-x_j \ge \xi-x_j$ 같은 부등식이 들어가고, 분모에서는 node 간 거리의 비교가 들어갑니다. 그리고 extremizer 쪽은 항의 부호가 모두 같아지는데, 임의의 $P_n$ 쪽은 그럴 필요가 없습니다.

결과적으로

$$
|P_n(\xi)| \le T_n\!\left(\frac{2\ell}{\lambda}-1\right)
$$
를 얻습니다.

---

### 3.6 가운데 구간에 최대점이 있으면 어떻게 될까요?

$\xi$가 $E$의 component들 사이에 있다면,  
$[a,\xi]$와 $[\xi,b]$를 따로 봅니다.

그때 왼쪽과 오른쪽에서의 “상대적 밀도”

$$
\theta_1 = \frac{|E\cap [a,\xi]|}{|\xi-a|},
\qquad
\theta_2 = \frac{|E\cap [\xi,b]|}{|b-\xi|}
$$
를 보면, 둘 다 동시에 전체 비율 $\theta=\lambda/\ell$보다 작을 수는 없습니다.  
즉 적어도 한쪽은 충분히 dense합니다.

그러면 그 한쪽 구간에서 앞의 argument를 그대로 돌릴 수 있고,  
결국 동일한 Remez bound를 얻습니다.

---

### 3.7 이 proof sketch에서 꼭 봐야 할 핵심은 무엇일까요?

고전 Remez 증명에서 정말 중요한 직관은 다음과 같습니다.

> measure $\lambda$를 가진 아무 복잡한 집합 $E$도,  
> extremal growth 관점에서는 결국 **끝에 붙은 interval**보다 더 위험하지 않습니다.

그리고 그 extremal interval에서의 최대 성장은 affine-scaled Chebyshev가 정확히 달성합니다.

즉,

- extremal set = 끝 interval,
- extremal polynomial = scaled Chebyshev,

이 두 가지가 만나 정확한 상수가 나옵니다.

---

## 4. Remez에서 approximate Schwartz-Zippel로: 실수 버전

이제 이 부등식을 논문이 어떻게 사용하는지 살펴보겠습니다.

차수 $d$ 다항식 $p$와 threshold $c\ge 0$에 대해

$$
E_c := \{x\in J : |p(x)|\le c\}
$$
를 생각해 보겠습니다.  
만약 $\|p\|_J = M$이라면 Remez inequality는

$$
M \le T_d\!\left(\frac{2}{\lambda_J(E_c)}-1\right)c
$$
를 줍니다.  
이를 뒤집어 쓰면

$$
\lambda_J(E_c)
\le
\text{(something depending on }c/M\text{)}.
$$
가 됩니다.

논문은 이를

$$
\kappa_{\mathbb R}(x)
=
\frac{1}{T_d(2/x-1)}
$$
라는 함수로 정리합니다. 그러면 대략

$$
M \cdot \kappa_{\mathbb R}(\lambda_J(E_c)) \le c
$$
형태가 되고, 따라서 $E_c$의 measure가 얼마나 작아야 하는지 알 수 있습니다.

이제 샘플링 집합 $S$가 구간 $J$ 위의 equispaced points라고 하겠습니다.  
그러면 $E_c$에 들어가는 표본점의 비율은 대략 $\lambda_J(E_c)$로 제어되고, 경계 효과 때문에 $d/|S|$ 같은 보정 항이 붙습니다.  
논문은 이 과정을 정리해서 다음 approximate Schwartz-Zippel 형태를 얻습니다.

$$
\Pr_{r\sim U(S)}[|p(r)|\le c]
\le
\frac{d}{|S|}
+
\Pr_{\rho\sim U(0,1)}[\|p\|_J\cdot \kappa_{\mathbb R}(\rho)\le c].
$$
이것은 놀랍게도 고전 Schwartz-Zippel의 자연스러운 근사 버전입니다.

- 고전 버전: $p(r)=0$일 확률 제어
- 근사 버전: $|p(r)|\le c$일 확률 제어

---

## 5. 그런데 복소수에서는 왜 더 강한 것이 필요할까요?

실수 버전만으로도 approximate sum-check는 돌아갑니다.  
그런데 이 논문이 정말 흥미로운 이유는 **복소수 $\mathbb C$**에서 더 깔끔하고 더 강한 정리를 끌어왔다는 데 있습니다.

논문이 인용하는 복소수 버전은 Tikhonov–Yuditskii의 **Sharp Remez inequality**입니다.

### 정리 (Sharp Remez inequality on the unit circle)
$p$가 차수 $d$의 복소계수 다항식이고, $E\subset \mathbb T$가 unit circle의 measurable subset이면

$$
\|p\|_{\mathbb T}
\le
T_d\!\left(
\csc\!\left(\frac{\pi}{2}\mu(E)\right)
\right)\|p\|_E.
$$
여기서 $\mu(E)$는 단위원에서의 normalized arc-length measure입니다.

논문 본문에서는 이 정리를 다음처럼 사용합니다.  
만약 $|E| \ge 2\pi-s$라고 쓰면

$$
\mu(E)=1-\frac{s}{2\pi},
$$
따라서

$$
\csc\!\left(\frac{\pi}{2}\mu(E)\right)
=
\csc\!\left(\frac{\pi}{2}-\frac{s}{4}\right)
=
\sec\!\left(\frac{s}{4}\right).
$$
즉 더 전통적인 형태

$$
\sup_{\zeta\in \mathbb T}|P_n(\zeta)|
\le
T_n\!\left(\sec\frac{s}{4}\right)
$$
와 완전히 같은 정리입니다.

---

## 6. 왜 “sharp”라는 말이 붙을까요?

고전 Remez도 이미 강한데, 왜 굳이 sharp Remez가 필요할까요?

핵심은 **상수(constant)와 extremizer의 정확한 구조**입니다.

실수 Remez는 interval 위의 extremal configuration을 Chebyshev로 잡습니다.  
복소수 단위원에서는 단순히 $x=\cos t$를 대입하는 것만으로 끝나지 않습니다.  
단위원 위의 measurable set은 일반적인 interval보다 훨씬 복잡한 arc union이 될 수 있고, 복소 다항식의 위상적, 해석적 구조도 훨씬 더 섬세합니다.

Tikhonov–Yuditskii는 정확한 최적 bound와 equality case까지 찾아냅니다.

극값을 달성하는 다항식은

$$
P_n(e^{iz})
=
e^{i(nz/2+c_1)}
T_n\!\left(\sec\frac{s}{4}\cos\frac{z-c_0}{2}\right)
$$
형태입니다.

즉, sharp Remez는 단지 “무언가가 가능하다”는 수준이 아니라,  
**어떤 집합 또는 다항식이 정확히 그 bound에 도달하는가”** 까지 알려 줍니다.

이 정밀함이 논문에서 복소수 버전 soundness가 더 좋게 나오는 이유입니다.

---

## 7. Sharp Remez inequality의 proof sketch

이제 2020년 Tikhonov–Yuditskii의 논리 구조를, 이 논문에 필요한 만큼만 정리해 보겠습니다.  
여기서 중요한 것은 전체 증명을 재현하는 것이 아니라, **왜 comb domain과 conformal map이 등장하는지**를 이해하는 것입니다.

---

### 7.1 문제를 “고정된 gap에서의 extremal problem”으로 바꿔 보겠습니다

단위원의 닫힌 proper subset $E\subset \mathbb T$가 있고, 그 complement가 여러 gap의 합이라고 하겠습니다.

먼저 저자들은 문제를 다음과 같이 세분화합니다.

- **Problem D**: 특정 gap 안의 고정된 점 $e^{ic}$에서 $|P_n(e^{ic})|$를 최대화합니다.
- **Problem C**: 특정 gap 안에서 점 $c$도 자유롭게 움직이며 최대화합니다.
- **Problem B / Theorem 1.2**: measure만 주어진 전체 문제를 풉니다.

즉, 처음부터 “모든 measurable set”을 직접 다루지 않고,  
먼저 **fixed-gap extremal polynomial의 구조**를 분석합니다.

---

### 7.2 Markov correction: extremizer를 조금 비틀어 모순을 만듭니다

가장 핵심적인 도구는 논문이 **Markov’s method of correction**이라고 부르는 방법입니다.

아이디어는 다음과 같습니다.

- 어떤 $T_n$이 fixed-gap problem의 extremizer라고 가정합니다.
- 그런데 이 다항식이 “extremizer답지 않은” 구조를 가지고 있다고 가정합니다.  
  예를 들어 nonreal zero가 있다거나, 중근이 있다거나, 두 zero 사이에 $|T_n|=1$을 찍는 contact point가 없다고 가정합니다.
- 그러면 적당한 rational-looking correction factor를 곱한 새 다항식 $Q$를 만듭니다.
- 이 correction은 목표점 $e^{ic_0}$에서의 값을 유지하면서도, $E$ 위의 sup norm은 더 줄입니다.
- 그러면 원래 $T_n$이 extremizer였다는 가정과 모순이 됩니다.

이 방식으로 저자들은 여러 구조를 차례로 강제합니다.

#### Step 1. nonreal zero는 없습니다
만약 $F$가 upper half-plane 안에 zero를 가지면, 그 zero와 그 켤레를 이용한 correction factor를 곱해 boundary values를 줄일 수 있습니다.

#### Step 2. zero는 simple해야 합니다
중근이 있으면 유사한 correction으로 역시 더 좋은 candidate를 만들 수 있습니다.

#### Step 3. 연속된 zero들 사이에는 $E$ 위에서 $|F|=1$인 점이 반드시 있어야 합니다
그런 점이 없으면 그 interval 전체에서 값을 낮추는 correction이 가능해집니다.

#### Step 4. target gap의 양 끝점에서 extremizer는 정확히 1에 닿아야 합니다
끝점에서 1에 못 미치면 gap을 향해 correction을 넣어, 여전히 admissible하면서 목표점 값을 키울 수 있습니다.

이 단계들의 결론은 매우 강력합니다.

> extremizer는 실축 위에서 아주 규칙적인 oscillation pattern을 가져야 합니다.

즉, zero와 critical point가 번갈아 나타나고, 각 gap과 contact point가 정밀하게 정렬된 “Chebyshev-like” 구조를 갖게 됩니다.

---

### 7.3 그래서 comb domain representation이 등장합니다

위와 같은 구조를 얻고 나면 extremizer는 사실상 어떤 periodic real entire function $F$의 boundary value 문제로 바뀝니다.

저자들은 이를

$$
T_n(e^{iz}) = e^{inz/2}F(z)
$$
로 쓴 뒤, Marchenko–Ostrovskii theorem을 통해

$$
F(z)=\cos\frac{n}{2}\theta(z)
$$
형태의 representation을 얻습니다.  
여기서 $\theta$는 upper half-plane을 어떤 **periodic $n$-regular comb domain**으로 보내는 conformal map입니다.

### comb domain이 왜 자연스러울까요?

Chebyshev polynomial을 떠올리면

$$
T_n(x)=\cos(n\arccos x)
$$
입니다.  
즉 Chebyshev 구조는 본질적으로 “$\cos$와 conformal, analytic parameterization”의 합성으로 나타납니다.

sharp Remez의 extremizer도 같은 철학을 따릅니다.  
다만 domain이 interval이 아니라 unit circle의 arc-complement이므로,  
단순한 $\arccos$ 대신 **comb domain으로 가는 conformal map $\theta$**가 들어갑니다.

이렇게 보면 sharp Remez inequality는 “Chebyshev phenomenon의 complex-analytic generalization”이라고 볼 수 있습니다.

---

### 7.4 extremal set은 결국 $n$-regular set이어야 합니다

다음 단계는 “어떤 집합 $E$가 가장 나쁜가?”를 밝히는 것입니다.

저자들은 주어진 $E$에 대해 $n$-regular extension을 정의하고,  
extremizer가 바뀌지 않으면서도 $E$를 더 regular한 집합으로 확장할 수 있음을 보입니다.

이 뜻은 간단합니다.

> extremal 문제를 푸는 데 있어서 복잡한 measurable set 전체를 볼 필요가 없습니다.  
> 충분히 structured한 $n$-regular set만 보면 됩니다.

이것은 실수 버전 Remez에서 “복잡한 $E$보다 끝 interval이 더 나쁘지 않다”는 명제에 정확히 대응하는 복소수 버전의 정리라고 보시면 됩니다.

---

### 7.5 여러 gap은 결국 하나의 gap으로 압축됩니다

이제 남은 문제는 $n$-regular set들 가운데 누가 가장 나쁜가 하는 점입니다.  
여기서 harmonic measure의 monotonicity가 등장합니다.

comb domain에서 slit 하나의 길이를 줄이면 대응하는 set의 measure는 커지고, extremal value는 유지되거나 더 나쁜 방향으로 움직이도록 제어할 수 있습니다.  
저자들은 이 아이디어를 이용해 gap을 하나씩 지워 나가고, 최종적으로 **single-gap set**이 extremal임을 보입니다.

즉, measure만 고정된 상황에서 최악의 경우는 결국

$$
E_s = \mathbb T \setminus (e^{-is/2}, e^{is/2})
$$
같은 **단 하나의 arc를 뺀 집합**입니다.

이는 실수 Remez의 extremal interval과 매우 닮은 결론입니다.

---

### 7.6 single-gap case에서는 conformal map을 직접 계산할 수 있습니다

여기까지 오면 문제는 explicit calculation입니다.

single-gap set에 대응하는 comb domain은 slit이 하나뿐입니다.  
따라서 디스크와 upper half-plane, 그리고 vertical slit domain 사이의 conformal mapping을 Möbius transform으로 명시적으로 계산할 수 있습니다.

저자들은 변수 변환을 통해 slit height $h_0$와 빠진 arc 길이 $s$ 사이의 관계를 계산하고,

$$
\cosh\frac{h_0}{2} = \sec\frac{s}{4}
$$
를 얻습니다.

그리고 extremizer는 결국

$$
T_n(e^{iz})
=
e^{inz/2}
T_n\!\left(\sec\frac{s}{4}\cos\frac{z}{2}\right)
$$
형태로 정리됩니다.

이 식을 $z=0$에서 평가하면 곧바로

$$
\sup_{\zeta\in\mathbb T}|P_n(\zeta)|
\le
T_n\!\left(\sec\frac{s}{4}\right)
$$
가 나옵니다.

게다가 equality case도 동시에 얻어집니다.

---

### 7.7 이 proof sketch의 핵심만 요약하면 다음과 같습니다

sharp Remez inequality의 논리는 다음 네 단계로 압축할 수 있습니다.

1. **고정된 gap에서 extremizer의 구조를 Markov correction으로 강제합니다.**
2. **그 구조를 comb-domain conformal map 표현으로 번역합니다.**
3. **harmonic measure를 이용해 여러 gap을 하나의 gap으로 압축합니다.**
4. **single-gap case를 explicit conformal mapping으로 계산합니다.**

즉, 고전 Remez가
- measure-preserving node selection,
- Lagrange interpolation,
- Chebyshev extremizer

로 끝나는 반면,

sharp Remez는
- extremal polynomial deformation,
- conformal mapping,
- harmonic measure,
- comb domains

까지 들어갑니다.

이것은 단순히 더 어려운 증명이라는 의미가 아니라,  
approximate sum-check가 왜 **complex analysis**를 필요로 하는지를 보여 주는 정확한 장면입니다.

---

## 8. Sharp Remez에서 approximate Schwartz-Zippel로: 복소수 버전

이제 논문에서 이 정리가 어떻게 쓰이는지 살펴보겠습니다.

차수 $d$ 복소 다항식 $p$와 threshold $c$에 대해

$$
E_c := \{\zeta \in \mathbb T : |p(\zeta)| \le c\}
$$
를 놓겠습니다.

sharp Remez inequality는

$$
\|p\|_{\mathbb T}
\le
T_d\!\left(
\csc\!\left(\frac{\pi}{2}\mu(E_c)\right)
\right)c
$$
를 줍니다. 이를 뒤집으면 $\mu(E_c)$가 작아야 함을 알 수 있습니다.

논문은 이를

$$
\kappa_{\mathbb C}(x)
=
\frac{1}{T_d\!\bigl(\csc(\pi x/2)\bigr)}
$$
로 정리합니다. 그러면 대략

$$
\|p\|_{\mathbb T}\cdot \kappa_{\mathbb C}(\mu(E_c)) \le c
$$
가 됩니다.

### roots of unity 샘플링과 결합

샘플링 집합 $S$를 $n$-th roots of unity라고 하겠습니다.  
그러면 $E_c$는 차수 $d$ 다항식의 sublevel set이므로 단위원 위에서 “너무 많은 조각”으로 쪼개질 수 없고,  
각 arc에 roots of unity가 몇 개 들어갈 수 있는지도 measure로 제어할 수 있습니다.

그래서 최종적으로 논문은

$$
\Pr_{r\sim U(S)}[|p(r)|\le c]
\le
\frac{d}{|S|}
+
\Pr_{\rho\sim U(0,1)}[\|p\|_{\mathbb T}\cdot \kappa_{\mathbb C}(\rho)\le c]
$$
를 얻습니다.

이것이 바로 Theorem 4.3의 본질입니다.

---

## 9. 이것이 왜 approximate sum-check에 정확히 들어맞을까요?

sum-check의 한 라운드에서 악의적 프로버가 보내는 거짓 다항식을 $p_k$,  
정직한 다항식을 $q_k$라고 하겠습니다.

우리는 랜덤 challenge $r_k$에서

$$
|p_k(r_k)-q_k(r_k)|
$$
가 갑자기 아주 작아질 확률을 제어해야 합니다.

그런데 차이 다항식 $s_k=p_k-q_k$를 놓으면, 이는 곧

$$
|s_k(r_k)| \le \delta
$$
의 확률을 묻는 문제가 됩니다.  
즉 정확히 Remez와 Sharp Remez가 다루는 sublevel set 문제입니다.

- 고전 sum-check:  
  $s_k(r_k)=0$의 확률 제어 $\rightarrow$ Schwartz-Zippel
- approximate sum-check:  
  $|s_k(r_k)|\le \delta$의 확률 제어 $\rightarrow$ Remez / Sharp Remez

이렇게 연결됩니다.

---

## 10. 실수와 복소수의 차이: 왜 $\mathbb C$가 더 좋게 나올까요?

논문에서 $\mathbb R$ 버전과 $\mathbb C$ 버전을 비교해 보면,  
복소수 쪽의 soundness 상수가 더 좋습니다. 핵심 이유는 바로 여기에 있습니다.

- 실수에서는 classical Remez를 써서
  $$
  \kappa_{\mathbb R}(x)=\frac{1}{T_d(2/x-1)}
  $$
  를 얻습니다.
- 복소수에서는 sharp Remez를 써서
  $$
  \kappa_{\mathbb C}(x)=\frac{1}{T_d(\csc(\pi x/2))}
  $$
  를 얻습니다.

대체로 $\kappa_{\mathbb C}$가 더 큽니다.  
$\kappa$가 크다는 말은 “랜덤 evaluation이 거리 $D(p,q)$를 심하게 줄이기 어렵다”는 뜻입니다.  
즉 악의적 프로버에게 더 불리한 bound가 된다는 의미입니다.

요약하면:

> **복소수 단위원의 더 정밀한 extremal geometry가 더 좋은 soundness로 이어집니다.**

---

## 11. 2편 정리

이 글의 핵심 요점을 다시 정리해 보겠습니다.

### (a) Remez inequality는 sublevel set를 제어하는 정리입니다
저차 다항식은 “큰 곳에서는 큰데 큰 subset 전체에서만 계속 작은” 식으로 행동하기 어렵습니다.

### (b) 고전 Remez의 extremizer는 affine-scaled Chebyshev입니다
원래 Remes의 증명은 measure-preserving하게 interpolation node를 잡고 Lagrange formula를 비교하는 매우 구체적인 argument입니다.

### (c) Sharp Remez는 단위원 위의 복소 버전이며, 훨씬 더 해석학적입니다
Markov correction, comb domain, harmonic measure, explicit conformal mapping이 모두 등장합니다.

### (d) 이 두 정리는 approximate Schwartz-Zippel lemma로 바로 이어집니다
그리고 그것이 approximate sum-check soundness의 엔진이 됩니다.

---

## 다음 글 예고

3편에서는 드디어 논문의 중심 정리들을 살펴보겠습니다.

- approximate arithmetic model
- approximate sum-check 프로토콜의 각 라운드
- completeness proof sketch
- generic soundness theorem의 유도
- $\mathbb R$ / $\mathbb C$ instantiation
- round-by-round soundness와 Fiat-Shamir에서의 “intermediate security”

까지 이어서 정리해 보겠습니다.

---

## 참고문헌

- Dor Bitan, Zachary DeStefano, Shafi Goldwasser, Yuval Ishai, Yael Tauman Kalai, Justin Thaler,  
  *Sum-check protocol for approximate computations*, 2025.
- Eugene Remes,  
  *On an Extremal Property of Chebyshev Polynomials* (1936; English translation).
- Sergey Tikhonov, Peter Yuditskii,  
  *Sharp Remez inequality*, Constructive Approximation, 2020.
