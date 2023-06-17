export function transition() {
    function delay(n) {
        n = n || 2000;
        return new Promise((done) => {
            setTimeout(() => {
                done();
            }, n);
        });
    }
    
    function pageTransition() {
        var tl = gsap.timeline();
        tl.to(".loading-screen", {
            duration: 1.2,
            width: "100%",
            left: "0%",
            ease: "Expo.easeInOut",
        });
    
        tl.to(".loading-screen", {
            duration: 1,
            width: "100%",
            left: "100%",
            ease: "Expo.easeInOut",
            delay: 0.3,
            
        });
        tl.set(".loading-screen", { left: "-100%" });
    }
    
    function contentAnimation() {
        var tl = gsap.timeline(
            
        );
        // tl.from(".header__wrapper", { duration: 1, y: 50, opacity: 1, stagger: 0.2, delay: 0.2 });
        tl.from(".animate-this", { duration: 0.5, x: 50, opacity: 0, stagger: 0.4, delay: 0.2,  });
        tl.from(".content__dev", { duration: 0.5, x: 50, opacity: 0, stagger: 0.4, delay: 0.4, });
        tl.from(".content__btn", { duration: 0.5, x: 50, opacity: 0, stagger: 0.4, delay: 0.4, });
        tl.from(".circles span", { duration: 0.5, x: 30, opacity: 0, stagger: 0.4, delay: 0.2,  });

        
        
        tl.from(".main-block__social", { duration: 1, y: 30, opacity: 0, stagger: 0.4, delay: 0.2,  });
    }

    

        barba.init({
            sync: true,
            // views: [{
            //     namespace: 'home',
            //    afterEnter() {
            //     particles();
            //     },
            //   }],
              prevent: ({ el }) => el.classList && el.classList.contains('prevent-barba'),
    
            transitions: [
                {
                    async leave(data) {
                        const done = this.async();
    
                        pageTransition();
                        await delay(1000);
                        done();
                    },
    
                    async enter(data) {
                        contentAnimation();
                    },
    
                    async once(data) {
                        contentAnimation();
                    },
                },
            ],
        });

    
}
