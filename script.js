// 네비게이션 링크 부드러운 스크롤 (이미 html { scroll-behavior: smooth; } 로 처리됨)
// CSS만으로도 가능하지만, 더 복잡한 제어가 필요할 때 JS 사용

// 스크롤 시 섹션 나타나는 효과 (Intersection Observer API 사용 예시)
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        root: null, // viewport 기준
        rootMargin: '0px',
        threshold: 0.1 // 섹션이 10% 보였을 때 콜백 실행
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                // 한 번 나타난 후에는 관찰 중지 (선택 사항)
                // observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        // 초기 상태 설정 (투명하고 약간 아래에서 시작)
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // 헤더/히어로 섹션은 처음부터 보이도록 처리
    const header = document.querySelector('header');
    const hero = document.querySelector('#hero');
    if (header) {
         header.style.opacity = 1;
         header.style.transform = 'translateY(0)';
    }
    if (hero) {
        hero.style.opacity = 1;
        hero.style.transform = 'translateY(0)';
    }
    // 히어로 섹션은 observer 관찰 대상에서 제외할 수 있습니다.
    // observer.unobserve(hero);
});

// 추가적인 JavaScript 기능 (예: 폼 유효성 검사, 슬라이더 등) 필요 시 여기에 작성