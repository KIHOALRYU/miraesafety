미래안전연구원 공지사항/자료실 관리자 기능 설치 안내

1. 먼저 이 폴더 전체를 웹호스팅에 올리면 기존 홈페이지와 관리자 화면 구조를 확인할 수 있습니다.
   관리자 주소 예: https://miraesafety.kr/admin.html

2. Supabase 가입 후 새 프로젝트를 생성합니다.

3. Supabase 대시보드의 SQL Editor에서 setup.sql 파일 내용을 전부 실행합니다.

4. Authentication > Users에서 관리자 계정을 만듭니다.
   실제 사용할 이메일과 비밀번호를 등록하세요.

5. Supabase Project Settings > API에서 Project URL과 anon/public key를 확인합니다.

6. supabase-config.js 파일을 메모장 또는 코드 편집기로 열어 아래 두 값을 교체합니다.
   MIRAE_SUPABASE_URL = 프로젝트 URL
   MIRAE_SUPABASE_ANON_KEY = anon/public key

7. 수정한 supabase-config.js를 웹호스팅에 다시 올립니다.

8. https://miraesafety.kr/admin.html 에 접속하여 4번에서 만든 관리자 이메일/비밀번호로 로그인합니다.

9. 공지사항 관리 또는 자료실 관리를 선택하고 제목/내용/첨부파일을 입력한 뒤 등록합니다. 홈페이지의 공지사항과 자료실에 자동으로 반영됩니다.

※ Supabase 연결 전에는 관리자 페이지가 테스트 모드로 작동합니다. 테스트 모드에서 쓴 글은 그 브라우저에만 저장되며 다른 PC나 휴대폰에서는 보이지 않습니다. 실제 운영에는 반드시 Supabase 연결이 필요합니다.

※ anon/public key는 웹사이트에 들어가도 되는 공개용 키입니다. service_role 키는 절대로 넣지 마세요.
