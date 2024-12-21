// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
}); 

// Add scroll reveal functionality
function handleScrollReveal() {
    const elements = document.querySelectorAll('.scroll-reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => observer.observe(element));
}

// Add this new code for challenge navigation
function initializeChallenges() {
    const challenges = document.querySelectorAll('.challenge-wrapper');
    const prevButton = document.querySelector('.prev-challenge');
    const nextButton = document.querySelector('.next-challenge');
    const counter = document.querySelector('.challenge-counter');
    let currentChallenge = 1;
    const totalChallenges = challenges.length;

    function updateChallengeView() {
        challenges.forEach(challenge => {
            challenge.classList.add('hidden');
        });
        document.querySelector(`[data-challenge="${currentChallenge}"]`).classList.remove('hidden');
        
        // Update navigation buttons
        prevButton.disabled = currentChallenge === 1;
        nextButton.disabled = currentChallenge === totalChallenges;
        
        // Update counter
        counter.textContent = `Challenge ${currentChallenge}/${totalChallenges}`;
    }

    prevButton.addEventListener('click', () => {
        if (currentChallenge > 1) {
            currentChallenge--;
            updateChallengeView();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentChallenge < totalChallenges) {
            currentChallenge++;
            updateChallengeView();
        }
    });

    // Initialize first view
    updateChallengeView();
}

// Add these functions to your existing JavaScript
function initializeCodeChallenge() {
    const runButtons = document.querySelectorAll('.run-button');
    const aiHelpers = document.querySelectorAll('.ai-helper');

    runButtons.forEach(button => {
        button.addEventListener('click', handleCodeRun);
    });

    aiHelpers.forEach(helper => {
        const input = helper.querySelector('input');
        const sendButton = helper.querySelector('.send-button');
        const helpButton = helper.querySelector('.help-button');

        sendButton.addEventListener('click', () => handleAIQuestion(input, helper));
        helpButton.addEventListener('click', () => showHint(helper));
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleAIQuestion(input, helper);
            }
        });
    });
}

function handleCodeRun(e) {
    const codeEditor = e.target.closest('.code-editor');
    const challenge = e.target.closest('.challenge-wrapper');
    const treeVisual = challenge.querySelector('.growing-tree-visual');
    const code = codeEditor.querySelector('code').textContent;
    
    // Here you would normally validate the code against the correct solution
    // For demo purposes, we'll just simulate success
    const isCorrect = true;

    if (isCorrect) {
        growTree(treeVisual);
        showSuccessMessage(challenge);
    }
}

function growTree(treeVisual) {
    treeVisual.classList.add('growing');
    const level = treeVisual.nextElementSibling;
    const currentLevel = parseInt(level.textContent.split(' ')[1]);
    level.textContent = `Level ${currentLevel + 1}`;
}

function handleAIQuestion(input, helper) {
    const messages = helper.querySelector('.ai-messages');
    const question = input.value.trim();
    
    if (!question) return;

    // Add user message
    addMessage(messages, question, 'user');
    
    // Simulate AI response
    setTimeout(() => {
        const response = "Here's a hint: Try breaking down the problem into smaller steps. First, think about how you would calculate this manually, then convert those steps into code.";
        addMessage(messages, response, 'ai');
    }, 1000);

    input.value = '';
}

function addMessage(container, text, type) {
    const message = document.createElement('div');
    message.className = `ai-message ${type}`;
    message.textContent = text;
    container.appendChild(message);
    container.scrollTop = container.scrollHeight;
}

function showHint(helper) {
    const messages = helper.querySelector('.ai-messages');
    const hint = "Let me help you get started! Here's a step-by-step approach to solve this challenge...";
    addMessage(messages, hint, 'ai');
}

// Add this function to create floating particles
function createParticles() {
    const container = document.querySelector('.ai-particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'ai-particle';
        
        // Random position and animation duration
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = 3 + Math.random() * 2;
        
        particle.style.left = `${left}%`;
        particle.style.animation = `particle-float ${duration}s ${delay}s infinite`;
        
        container.appendChild(particle);
    }
}

// Add typing animation for code
function typeCode() {
    const codeElement = document.querySelector('.typing-code');
    const cursor = document.querySelector('.cursor');
    const code = codeElement.textContent;
    codeElement.textContent = '';
    let i = 0;

    function type() {
        if (i < code.length) {
            codeElement.textContent += code.charAt(i);
            i++;
            cursor.style.left = `${codeElement.textContent.length * 0.6}em`;
            setTimeout(type, 50);
        }
    }

    type();
}

// Update the DOM loaded event listener
document.addEventListener('DOMContentLoaded', () => {
    handleScrollReveal();
    initializeChallenges();
    initializeCodeChallenge();
    createParticles();
    typeCode();
}); 