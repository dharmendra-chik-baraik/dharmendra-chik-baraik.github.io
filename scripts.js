// Final Scripts

// Back to Top Button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.style.opacity = '1';
    } else {
        backToTop.style.opacity = '0';
    }
});

backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Project Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.classList.remove('hide');
            } else {
                item.classList.add('hide');
            }
        });
    });
});

// ==================== CONTACT FORM HANDLER WITH EMAILJS ====================
function handleContactSubmit(event) {
    event.preventDefault();

    // Get form elements
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Get form values
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const subject = form.querySelectorAll('input[type="text"]')[1].value;
    const message = form.querySelector('textarea').value;

    // Validate form
    if (!name || !email || !subject || !message) {
        alert('Please fill all fields!');
        return;
    }

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    // EmailJS Template Parameters
    const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_email: 'dcbaraik143@gmail.com',
        to_name: 'Dharmendra Chik Baraik',
        time: new Date().toLocaleString(),
    };

    // Send email using EmailJS
    emailjs.send('service_iq6omjx', 'template_4f680cx', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Success message
            submitBtn.innerHTML = '<i class="fas fa-check-circle me-2"></i> Message Sent!';
            submitBtn.style.background = '#4caf50';
            submitBtn.style.opacity = '1';

            // Show success alert
            const successDiv = document.createElement('div');
            successDiv.className = 'success-message mt-3 animate__animated animate__fadeInUp';
            successDiv.style.display = 'block';
            successDiv.innerHTML = `
                <i class="fas fa-check-circle me-2"></i> 
                Thank you <strong>${name}</strong>! Your message has been sent successfully. 
                I'll get back to you at <strong>${email}</strong> soon.
            `;
            form.appendChild(successDiv);

            // Reset form
            form.reset();

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)';
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
                successDiv.remove();
            }, 3000);
        })
        .catch(function(error) {
            console.log('FAILED...', error);
            
            // Error message
            submitBtn.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i> Failed to Send';
            submitBtn.style.background = '#f44336';
            submitBtn.style.opacity = '1';

            // Show error alert
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message mt-3 animate__animated animate__shakeX';
            errorDiv.style.display = 'block';
            errorDiv.style.background = 'rgba(244,67,54,0.1)';
            errorDiv.style.border = '1px solid #f44336';
            errorDiv.style.color = '#f44336';
            errorDiv.style.padding = '12px';
            errorDiv.style.borderRadius = '10px';
            errorDiv.innerHTML = `
                <i class="fas fa-exclamation-triangle me-2"></i> 
                Oops! Something went wrong. Please try again or email me directly at 
                <strong>dcbaraik143@gmail.com</strong>
            `;
            form.appendChild(errorDiv);

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)';
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
                errorDiv.remove();
            }, 4000);
        });

    return false;
}
// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// Form input animation
document.querySelectorAll('.custom-input').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.querySelector('label')?.style.color = '#00d2ff';
    });
    input.addEventListener('blur', () => {
        input.parentElement.querySelector('label')?.style.color = '#e0e0e0';
    });
});

// Animate progress bars when visible
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-bar-custom');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.gradient-border').forEach(card => {
    observer.observe(card);
});

        // Add hover effect for info cards
        document.querySelectorAll('.gradient-border').forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 15px 40px rgba(0, 210, 255, 0.15)';
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        });