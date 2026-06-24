# 현명역학원 아카데미 Render 배포용

이 폴더를 GitHub 저장소에 올린 뒤 Render에서 Static Site로 연결하면 됩니다.

## Render 설정

- Service type: Static Site
- Build command: 비워두기
- Publish directory: `.`

## 도메인 연결

Render 배포가 끝난 뒤 Custom Domains에서 아래 도메인을 추가합니다.

- `hmsaju83.com`
- `www.hmsaju83.com`

Render가 알려주는 DNS 값을 가비아 DNS에 입력하면 실제 도메인이 새 사이트로 연결됩니다.
