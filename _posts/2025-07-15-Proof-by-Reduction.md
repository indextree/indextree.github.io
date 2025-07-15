---
title: Proof by Reduction
date: 2025-07-15 10:00:00 +0900
categories: [Cryptography]
tags: [Cryptography]
pin: false
math: true
mermaid: true
image:
  path: /assets/img/Reduction.png
  alt: Proof by Reduction
---

## Proof by Reduction, in high level

생각보다 별로 어렵지 않다. 핵심은 **어렵다고 알려진 문제**들에 의존하는 것이다. Reduction이란 단어의 뜻이 그렇듯이, 쉬운지 어려운지 애매한 문제가 있다고 가정하자. 이 문제를 풀었을 때 **어렵다고 알려진 문제**가 풀린다면, 이 문제가 어려운 문제라는 사실은 자명한데, 이를 이용하는 것이다.

## Formal definition of *Proof by Reduction*

어떤 crytographic construction $\Pi$가 문제 $X$에 대하여 secure하다는 것은 일반적으로 $\Pi$를 공격하는 데 성공하는 효율적인 adversary $\mathcal{A}$를 $X$를 푸는 데 성공하는 효율적인 알고리즘 $\mathcal{A}'$으로 변환하는 과정이다. 우선, 가정이 하나 필요한데, $X$는 어떤 polynomial-time algorithm으로도 풀리지 않는다는 가정이다. (negligible probablity로 풀리는 것은 예외로 한다) 이러한 상태에서, 다음과 같은 과정을 거친다.

1. $\Pi$를 공격하는 어떤 효율적인 adversary $\mathcal{A}$를 고정시킨다. (i.e. $\mathsf{PPT}$ - Probablistic Polynomial Time) 이러한 adversary의 성공 확률을 $\epsilon (n)$이라고 하자.

2. $\mathcal{A}$를 subroutine으로 사용하는, $X$를 푸는 효율적인 알고리즘 $\mathcal{A}'$을 설계하자. $\mathcal{A}'$는 $\mathcal{A}$를 black-box처럼 사용하지만, $\mathcal{A}$가 $\Pi$를 공격한다는 사실만은 알고 있다. 즉, 문제 $X$의 어떤 input instance $\mathsf{x}$에 대해, 알고리즘 $\mathcal{A}'$은 $A$를 위해 $\Pi$의 한 인스턴스를 시뮬레이션하는데, 다음 조건을 만족시켜야 한다.
    
    - $\mathcal{A}$의 관점에서 보면, 환경 자체만으로는 임의로 주어진 $\Pi$의 한 인스턴스와 동일해야 한다. 즉, $\mathcal{A}$에게 주어지는 인스턴스는 $\mathcal{A}'$로부터 격리되어야 한다.

    - $\mathcal{A}'$에 의해 *simulate*되는 $\mathcal{A}$가 $\Pi$를 공격하는 데 성공하면, 적어도 $1/p(n)$의 확률로 ($p(n)$은 $n$에 대한 polynomial) $\mathcal{A}'$는 instance $\mathsf{x}$를 풀 수 있어야 한다.

3. 이는 $\mathcal{A}'$는 문제 $\mathsf{X}$를 확률 $\epsilon (n)/p(n)$으로 풀어낸다는 것을 의미한다. 만약, $\epsilon(n)$이 negligible하지 않다면, $\epsilon(n)/p(n)$도 마찬가지이다. ($\mathsf{negl}$의 성질에 의해) 게다가, 만약 $\mathcal{A}$가 효율적이라면 $\mathsf{X}$를 non-negligible한 probablity로 풀어내는 효율적인 알고리즘 $\mathcal{A}'$을 얻어낼 수 있는데, 이는 가정에 모순이다.

4. $\mathsf{X}$에 대한 가정을 바탕으로, 어떤 효율적인 adversary $\mathcal{A}$도 $\Pi$를 non-negligible한 probablity로 공격하는 건 불가능하다는 사실을 알 수 있다. 다르게, $\Pi$는 computationally secure하다.

## To be continued

다음 포스트에서는 Proof of Reduction을 어떻게 실제로 적용하는지, 그 exmaple들을 가지고 와 보도록 할 것입니다. 읽어주셔서 감사합니다!