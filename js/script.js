
        gsap.from("#widow",{
            scrollTrigger : {
                scrub: true
            },
            y:-2000,duration: 2
        })
        gsap.from("#marvel",{
            scrollTrigger : {
                scrub: true
            },
            y:1000, duration: 2
        })
        gsap.from("#thor",{
            scrollTrigger : {
                scrub: true
            },
            y:5000,
            x: 5000, duration: 3
        })
        gsap.from("#iron",{
            scrollTrigger : {
                scrub: true
            },
            y:-2500, duration: 4
        })
        gsap.from("#hulk",{
            scrollTrigger : {
                scrub: true
            },
            y:2500, x:-1000, duration: 4
        })
        gsap.from("#pool",{
            scrollTrigger : {
                scrub: true
            },
            x:-2500, duration: 6
        })
        let valeur = 0;
        let p_ordre = document.querySelector('.p-ordre') 
        let p_sortie = document.querySelector('.p-sortie') 
        let sortie = document.querySelector('.sortie');
        let ordre = document.querySelector('.ordre');
        p_sortie.style.display="none";

        ordre.addEventListener('click', function() {
            p_ordre.style.display = 'block';
            p_sortie.style.display ='none';
        })

        sortie.addEventListener('click', function() {
            p_ordre.style.display = 'none';
            p_sortie.style.display ='block';
        })

