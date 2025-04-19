// Typewriter effect
const typewriter = document.querySelector('.typewriter');
const words = ['Developer', 'Designer', 'Professional']; // Update with client's roles
let wordIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < words[wordIndex].length) {
        typewriter.textContent += words[wordIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typewriter.textContent = words[wordIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    }
}

// Start the typewriter effect
setTimeout(type, 1000);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

document.addEventListener('DOMContentLoaded', function() {
    // Skill tabs functionality
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillContents = document.querySelectorAll('.skill-content');

    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            skillTabs.forEach(t => t.classList.remove('active'));
            skillContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            document.querySelector(`#${tab.dataset.tab}`).classList.add('active');
        });
    });

    // Animate skill bars on scroll
    const skillCards = document.querySelectorAll('.skill-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelector('.level-fill').style.width = 
                    entry.target.querySelector('.level-fill').dataset.level;
            }
        });
    }, { threshold: 0.5 });

    skillCards.forEach(card => observer.observe(card));

    // Experience section interactions
    const expCards = document.querySelectorAll('.exp-card');
    
    expCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.exp-details').style.maxHeight = 
                card.querySelector('.exp-details').scrollHeight + 'px';
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate form submission (replace with actual form submission)
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                contactForm.reset();
                setTimeout(() => {
                    submitBtn.innerHTML = 'Send Message';
                }, 3000);
            }, 1500);
        });
    }

    // Smooth scroll with offset for header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Add active state to navigation links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function highlightNavLink() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    const cube = document.querySelector('.cube');
    const wrapper = document.querySelector('.cube-wrapper');
    let bounds;
    let isHovered = false;

    function updateBounds() {
        bounds = wrapper.getBoundingClientRect();
    }

    window.addEventListener('resize', updateBounds);
    updateBounds();

    wrapper.addEventListener('mouseenter', () => {
        isHovered = true;
        cube.style.animation = 'none'; // Pause rotation on hover
    });

    wrapper.addEventListener('mouseleave', () => {
        isHovered = false;
        cube.style.animation = 'rotate 15s infinite linear'; // Resume rotation
        cube.style.transform = 'rotateX(0) rotateY(0)';
    });

    document.addEventListener('mousemove', (e) => {
        if (!bounds || !isHovered) return;

        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;
        const angleX = (mouseY - centerY) * 0.2;
        const angleY = (mouseX - centerX) * 0.2;

        cube.style.transform = `rotateX(${-angleX}deg) rotateY(${angleY}deg)`;
    });

    // Update the skill progress animation
    const progressObserver1 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress');
                const percentage = entry.target.querySelector('.percentage').textContent;
                progressBar.style.width = percentage;
            }
        });
    }, { threshold: 0.3 });

    skillElements.forEach(item => progressObserver1.observe(item));

    // Enhanced skill section interactions
    const skillCategories = document.querySelectorAll('.skills-category');
    const skillElements = document.querySelectorAll('.skill-item');
    
    // Create a more dramatic entrance for skill categories
    const skillsCategoryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay to each category
                setTimeout(() => {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });
    
    // Add initial styles with JavaScript to ensure they only apply after JS loads
    skillCategories.forEach((category, index) => {
        category.style.opacity = 0;
        category.style.transform = 'translateY(30px)';
        skillsCategoryObserver.observe(category);
    });
    
    // Improve skill progress bar animation
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress');
                const percentage = entry.target.querySelector('.percentage').textContent;
                
                // Add staggered delay to each progress bar
                setTimeout(() => {
                    progressBar.style.width = percentage;
                }, index * 150);
                
                // Add pulsing animation to the percentage text
                const percentElement = entry.target.querySelector('.percentage');
                percentElement.classList.add('pulse-animation');
                
                // Remove the observer once the animation has played
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    // Observe each skill item
    skillItems.forEach(item => {
        progressObserver.observe(item);
    });
    
    // Add hover effect interactions to skill tags
    const skillTags = document.querySelectorAll('.skill-tags span');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('tag-ripple');
            tag.appendChild(ripple);
            
            // Remove ripple after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });

    // Animate skill bars in the collage layout
    const skillFills = document.querySelectorAll('.skill-fill');
    const skillItems = document.querySelectorAll('.skill-item');
    
    function animateSkillBars() {
        skillFills.forEach(fill => {
            const width = fill.getAttribute('data-width');
            fill.style.width = width;
        });
    }
    
    // Create observer for skill section
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                
                // Trigger decorative animations
                const dots = document.querySelectorAll('.dot');
                dots.forEach((dot, index) => {
                    dot.style.animationDelay = `${index * 0.1}s`;
                });
            }
        });
    }, { threshold: 0.3 });
    
    // Observe the skills section
    const skillsSection = document.querySelector('.skills-collage');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    // Add hover effect to skill sections with random rotations
    const skillsSections = document.querySelectorAll('.skills-section');
    
    skillsSections.forEach(section => {
        if (!section.classList.contains('decoration-small') && !section.classList.contains('decoration-medium')) {
            // Add subtle rotation on hover only for non-decorative sections
            section.addEventListener('mouseenter', () => {
                const randomRotation = (Math.random() * 2 - 1) * 0.5; // Between -0.5 and 0.5 degrees
                section.style.transform = `translateY(-5px) rotate(${randomRotation}deg)`;
            });
            
            section.addEventListener('mouseleave', () => {
                section.style.transform = '';
            });
        }
    });

    // Fix animations by triggering reflow
    setTimeout(() => {
        document.querySelectorAll('.hero-content > *').forEach(el => {
            el.style.animation = 'none';
            void el.offsetWidth; // Trigger reflow
            el.style.animation = '';
        });
    }, 100);
});

// Initialize EmailJS with your public key
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual public key
})();

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Get form data
    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        to_name: 'Shaili Srivastava',
        to_email: 'shailisrivastava0905@gmail.com'
    };

    // Send email using EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            document.getElementById('contactForm').reset();
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = 'Thank you! Your message has been sent successfully.';
            document.getElementById('contactForm').appendChild(successMessage);
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                successMessage.remove();
            }, 3000);
        }, function(error) {
            submitBtn.innerHTML = '<i class="fas fa-times"></i> Failed to send';
            
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.innerHTML = 'Sorry, there was an error sending your message. Please try again.';
            document.getElementById('contactForm').appendChild(errorMessage);
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                errorMessage.remove();
            }, 3000);
        });
});

// 3D Cube Animation with Auto-rotation and Cursor Interaction
function init3DCube() {
    const cube = document.querySelector('.cube');
    const wrapper = document.querySelector('.cube-wrapper');
    
    if (!cube || !wrapper) return;

    let isHovered = false;
    let cursorRotateX = 0;
    let cursorRotateY = 0;

    // Update cube rotation based on cursor position
    function updateRotation(e) {
        if (!isHovered) return;
        
        const rect = wrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        cursorRotateY = ((mouseX - centerX) / rect.width) * 45;
        cursorRotateX = ((mouseY - centerY) / rect.height) * 45;
        
        cube.style.transform = `rotateX(${cursorRotateX}deg) rotateY(${cursorRotateY}deg)`;
    }

    // Handle hover states
    wrapper.addEventListener('mouseenter', () => {
        isHovered = true;
        cube.style.animation = 'none';
        cube.style.transition = 'transform 0.3s ease';
    });

    wrapper.addEventListener('mouseleave', () => {
        isHovered = false;
        cube.style.animation = 'rotate 20s infinite linear';
        cube.style.transition = 'transform 0.3s ease';
        cube.style.transform = 'rotateX(20deg) rotateY(20deg)';
    });

    wrapper.addEventListener('mousemove', updateRotation);
}

// Initialize the cube when the DOM is loaded
document.addEventListener('DOMContentLoaded', init3DCube);

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Mobile menu toggle
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scrolled');
            return;
        }
        
        if (currentScroll > lastScroll && !navLinks.classList.contains('active')) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        navbar.classList.add('scrolled');
        lastScroll = currentScroll;
    });
}

// Initialize navbar when DOM is loaded
document.addEventListener('DOMContentLoaded', initNavbar);