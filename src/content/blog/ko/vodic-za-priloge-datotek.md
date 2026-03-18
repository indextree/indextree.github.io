---
title: "첨부파일 기능 시작하기"
linkedContent: "file-attachments-guide"

description: "블로그 게시물에서 첨부파일 기능을 사용하는 실용적인 가이드입니다. 다운로드 가능한 템플릿과 예제를 포함합니다."
keywords: "첨부파일, 블로그 기능, 다운로드, 템플릿, 문서, PDF, 스프레드시트"

author: "Changmin Cho"
pubDate: 2026-03-17
isDraft: false

image: "@blogImages/image-2.png"
imageAlt: "파일 관리 일러스트"

attachments:
  - name: "프로젝트 제안서 템플릿"
    file: "/attachments/project-proposal-template.pdf"
    size: "120 KB"
  - name: "예산 계획 스프레드시트"
    file: "/attachments/budget-planning.xlsx"
    size: "85 KB"
  - name: "회의록 템플릿"
    file: "/attachments/meeting-notes-template.docx"
    size: "42 KB"
---

## Zakaj so priloge datotek pomembne

Objave na blogu so odličen način za deljenje znanja, vendar včasih besede same niso dovolj. Pripenjanje datotek za prenos vam omogoča, da bralcem neposredno zagotovite **predloge**, **preglednice**, **poročila** in druge vire.

### Kako deluje

Dodajanje prilog k objavi na blogu je preprosto. Preprosto vključite polje `attachments` v frontmatter vaše objave:

```yaml
attachments:
  - name: "Moj dokument"
    file: "/attachments/moj-dokument.pdf"
    size: "120 KB"
```

Vsaka priloga zahteva:

- **name** — Berljiva oznaka za datoteko
- **file** — Pot do datoteke (shranjene v `public/attachments/`)
- **size** — *(neobvezno)* Velikost datoteke, prikazana bralcu

### Podprte vrste datotek

Komponenta prilog samodejno zazna vrsto datoteke in prikaže barvno označeno značko:

| Končnica | Vrsta | Barva značke |
|----------|-------|--------------|
| `.pdf` | PDF | Rdeča |
| `.docx` | DOCX | Modra |
| `.xlsx` | XLSX | Zelena |
| `.pptx` | PPTX | Oranžna |
| `.csv` | CSV | Zelena |
| `.txt` | TXT | Siva |
| `.zip` | ZIP | Rumena |

### Preizkusite

Pomaknite se navzdol, da si ogledate razdelek s prilogami pod to objavo. Vzorčne datoteke lahko prenesete, da vidite, kako funkcija deluje v praksi.

> Nasvet: Datoteke shranite v imenik `public/attachments/`, da jih Astro servira kot statična sredstva.
