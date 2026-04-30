// Nav scroll effect
  const navEl = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    navEl.classList.toggle('scrolled', window.scrollY > 60);
  });

  // Fade-in on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // FAQ accordion
  function toggleFaq(el) {
    const answer = el.nextElementSibling;
    const icon = el.querySelector('.faq-item__icon');
    const isOpen = answer.classList.contains('open');
    
    // Close all others
    document.querySelectorAll('.faq-item__a.open').forEach(a => {
      a.classList.remove('open');
      a.previousElementSibling.querySelector('.faq-item__icon').classList.remove('open');
    });
    
    // Toggle this one
    if (!isOpen) {
      answer.classList.add('open');
      icon.classList.add('open');
    }
  }


  // Program Finder
  let finderAge = null;
  
  function selectAge(age) {
    finderAge = age;
    // If age is 5-8, go straight to Foundation (no level needed)
    if (age === '5-6' || age === '7-8') {
      showResult('resultFoundation');
    } else {
      document.getElementById('finderStep1').classList.remove('active');
      document.getElementById('finderStep2').classList.add('active');
    }
  }
  
  function selectLevel(level) {
    document.getElementById('finderStep2').classList.remove('active');
    
    if (level === 'new' || level === 'rec') {
      // New or recreational players 9+ need assessment for Elevate
      showResult('resultElevate');
    } else if (level === 'club') {
      // Club players could be Elevate
      showResult('resultElevate');
    } else if (level === 'comp') {
      // Competitive players could be Summit track
      showResult('resultSummitTrack');
    } else {
      showResult('resultContact');
    }
  }
  
  function showResult(id) {
    document.querySelectorAll('.finder__result').forEach(r => r.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    // Hide the steps
    document.querySelectorAll('.finder__step').forEach(s => s.classList.remove('active'));
  }
  
  function resetFinder() {
    finderAge = null;
    document.querySelectorAll('.finder__result').forEach(r => r.classList.remove('active'));
    document.querySelectorAll('.finder__step').forEach(s => s.classList.remove('active'));
    document.getElementById('finderStep1').classList.add('active');
    // Scroll back to finder
    document.getElementById('program-finder').scrollIntoView({ behavior: 'smooth' });
  }



  // Close mobile menu when any link is clicked
  document.querySelectorAll('.nav__mobile-link, .nav__mobile-cta').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelector('.nav__mobile-menu').classList.remove('open');
      const hamburger = document.querySelector('.nav__hamburger');
      if (hamburger) hamburger.classList.remove('open');
    });
  });

  // Scroll to top button visibility
  const scrollTopBtn = document.getElementById('scrollTop');
  const mobileCtaEl = document.getElementById('mobileCta');
  const heroHeight = document.querySelector('.hero').offsetHeight;
  
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > heroHeight;
    scrollTopBtn.classList.toggle('visible', scrolled);
    if (mobileCtaEl) mobileCtaEl.classList.toggle('visible', scrolled);
  });

  // Track form submission for analytics
  function trackConversion(formName) {
    // Google Analytics 4 event
    if (typeof gtag === 'function') {
      gtag('event', 'generate_lead', {
        event_category: 'form',
        event_label: formName
      });
    }
    // Meta Pixel event
    if (typeof fbq === 'function') {
      fbq('track', 'Lead', { content_name: formName });
    }
  }

  // Assessment form handled by Jotform embed

  // Tournament interest form handled by Jotform embed
