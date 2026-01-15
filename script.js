// Initialize Matrix Rain Background
function initMatrixRain() {
    const matrixBg = document.getElementById('matrixBg');
    const chars = "01";
    const columns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.position = 'absolute';
        column.style.top = '-100px';
        column.style.left = (i * 20) + 'px';
        column.style.width = '20px';
        column.style.fontSize = '18px';
        column.style.color = '#0aff0a';
        column.style.textShadow = '0 0 5px #0aff0a';
        column.style.opacity = '0.3';
        column.style.fontFamily = 'monospace';
        column.style.overflow = 'hidden';
        
        // Create falling characters
        let text = '';
        const charCount = Math.floor(Math.random() * 20) + 10;
        for (let j = 0; j < charCount; j++) {
            text += chars[Math.floor(Math.random() * chars.length)] + '\n';
        }
        
        column.innerHTML = text;
        matrixBg.appendChild(column);
        
        // Animate the column
        animateMatrixColumn(column);
    }
}

function animateMatrixColumn(column) {
    let position = -100;
    const speed = Math.random() * 2 + 1;
    
    function move() {
        position += speed;
        column.style.top = position + 'px';
        
        if (position > window.innerHeight) {
            position = -500;
            // Change some characters randomly
            const chars = column.innerHTML.split('\n');
            for (let i = 0; i < chars.length; i++) {
                if (Math.random() > 0.7) {
                    chars[i] = Math.random() > 0.5 ? '1' : '0';
                }
            }
            column.innerHTML = chars.join('\n');
        }
        
        requestAnimationFrame(move);
    }
    
    move();
}

// Terminal Functions
function initTerminal() {
    const terminal = document.getElementById('terminal');
    const output = terminal.querySelector('.output');
    
    // Show terminal after delay
    setTimeout(() => {
        terminal.style.display = 'block';
        animateTerminal(output);
    }, 1000);
}

function animateTerminal(output) {
    const messages = [
        "[+] Profile loaded: FARHAN AHMED MIAJEE",
        "[+] System: BAUSTK CSE Batch-03",
        "[+] Location: BNSB Eye Hospital, Khulna",
        "[+] Skills Matrix initialized...",
        "[+] Security Protocols: ACTIVE",
        "[+] Gaming Module: ONLINE",
        "[+] Creative Suite: READY",
        "[+] All systems operational...",
        "[>] Type 'help' for commands"
    ];
    
    let index = 0;
    
    function typeMessage() {
        if (index < messages.length) {
            const message = document.createElement('div');
            message.className = 'output-line';
            message.style.opacity = '0';
            message.textContent = messages[index];
            output.appendChild(message);
            
            // Animate in
            setTimeout(() => {
                message.style.transition = 'opacity 0.5s';
                message.style.opacity = '1';
                playTypeSound();
            }, 50);
            
            index++;
            setTimeout(typeMessage, 500);
        } else {
            // Add blinking cursor
            const cursor = document.createElement('span');
            cursor.className = 'cursor';
            cursor.textContent = '_';
            cursor.style.animation = 'blink 1s infinite';
            output.appendChild(cursor);
        }
    }
    
    typeMessage();
}

// Sound Effects
function playTypeSound() {
    const audio = document.getElementById('typeSound');
    audio.currentTime = 0;
    audio.volume = 0.2;
    audio.play().catch(e => console.log("Audio play failed:", e));
}

function playGlitchSound() {
    const audio = document.getElementById('glitchSound');
    audio.currentTime = 0;
    audio.volume = 0.3;
    audio.play().catch(e => console.log("Audio play failed:", e));
}

// Typing Animation
function initTypingText() {
    const typingElements = document.querySelectorAll('.typing-text');
    
    typingElements.forEach((element, index) => {
        const text = element.textContent;
        element.textContent = '';
        
        setTimeout(() => {
            typeText(element, text, 0);
        }, index * 200);
    });
}

function typeText(element, text, index) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        if (text.charAt(index) !== ' ') {
            playTypeSound();
        }
        setTimeout(() => typeText(element, text, index + 1), 50);
    }
}

// Animate Stats
function animateStats() {
    const statValues = document.querySelectorAll('.stat-value');
    const statFills = document.querySelectorAll('.stat-fill');
    
    statValues.forEach((stat, index) => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        const fill = statFills[index];
        
        function updateStat() {
            if (current < target) {
                current += increment;
                if (current > target) current = target;
                
                stat.textContent = Math.floor(current) + '%';
                fill.style.width = current + '%';
                
                requestAnimationFrame(updateStat);
            }
        }
        
        setTimeout(() => {
            updateStat();
        }, index * 300 + 1000);
    });
}

// Random Glitch Effect
function randomGlitch() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        if (Math.random() > 0.95) {
            card.style.transform = 'translate(' + 
                (Math.random() * 10 - 5) + 'px, ' + 
                (Math.random() * 10 - 5) + 'px)';
            card.style.boxShadow = '0 0 ' + 
                (Math.random() * 30) + 'px rgba(0, 255, 65, ' + 
                (Math.random() * 0.5 + 0.3) + ')';
            
            playGlitchSound();
            
            setTimeout(() => {
                card.style.transform = '';
                card.style.boxShadow = '';
            }, 100);
        }
    });
}

// Connection Animation
function animateConnections() {
    const nodes = document.querySelectorAll('.connection-node');
    const line = document.querySelector('.connection-line');
    
    nodes.forEach((node, index) => {
        setTimeout(() => {
            node.style.opacity = '0';
            node.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                node.style.transition = 'all 0.5s';
                node.style.opacity = '1';
                node.style.transform = 'scale(1)';
                
                // Animate line
                if (line && index === nodes.length - 1) {
                    line.style.height = '50px';
                    line.style.transition = 'height 1s';
                }
            }, 100);
        }, index * 200 + 1000);
    });
}

// Log Entry Animation
function animateLogs() {
    const logs = document.querySelectorAll('.log-entry');
    
    logs.forEach((log, index) => {
        log.style.opacity = '0';
        log.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            log.style.transition = 'all 0.5s ease-out';
            log.style.opacity = '1';
            log.style.transform = 'translateX(0)';
        }, index * 200 + 1500);
    });
}

// Particle System for Hover Effects
function initParticles() {
    document.querySelectorAll('.card, .neon-button').forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            createParticles(e, this);
        });
    });
}

function createParticles(e, element) {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.backgroundColor = '#00ff41';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        element.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1;
        const dx = Math.cos(angle) * speed;
        const dy = Math.sin(angle) * speed;
        
        let posX = 0;
        let posY = 0;
        let opacity = 1;
        
        function animateParticle() {
            posX += dx;
            posY += dy;
            opacity -= 0.02;
            
            particle.style.transform = `translate(${posX}px, ${posY}px)`;
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        }
        
        animateParticle();
    }
}

// Interactive Terminal Commands
function initTerminalCommands() {
    const terminal = document.getElementById('terminal');
    const terminalBody = terminal.querySelector('.terminal-body');
    
    // Close terminal on click
    terminal.querySelector('.close').addEventListener('click', () => {
        terminal.style.animation = 'fadeOut 0.5s forwards';
        setTimeout(() => {
            terminal.style.display = 'none';
        }, 500);
    });
    
    // Add command input
    const inputLine = document.createElement('div');
    inputLine.className = 'command-line';
    inputLine.innerHTML = '<span class="prompt">root@baustk:~$</span><input type="text" class="command-input">';
    terminalBody.appendChild(inputLine);
    
    const commandInput = inputLine.querySelector('.command-input');
    commandInput.focus();
    
    commandInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const command = commandInput.value.toLowerCase();
            processCommand(command);
            commandInput.value = '';
        }
    });
}

function processCommand(command) {
    const output = document.querySelector('.output');
    const response = document.createElement('div');
    response.className = 'output-line';
    
    const commands = {
        'help': 'Available commands: help, clear, about, skills, games, contact, bus',
        'clear': () => {
            document.querySelectorAll('.output-line').forEach(el => {
                if (!el.classList.contains('command-line')) el.remove();
            });
            return 'Terminal cleared.';
        },
        'about': 'Farhan Ahmed Miajee - BAUSTK CSE Batch-03 Student',
        'skills': 'Cyber Security, Gaming, Photography, Video Editing',
        'games': 'Specializes in Racing Games and Competitive Esports',
        'contact': 'Location: BNSB Eye Hospital, Siromoni, Khulna',
        'bus': 'BAUST Khulna Bus - https://commons.wikimedia.org/wiki/File:BAUST_Khulna_Bus.jpg',
        'matrix': 'Initializing glitch sequence...'
    };
    
    if (command === 'matrix') {
        // Special effect for matrix command
        document.body.classList.add('glitch-effect');
        setTimeout(() => {
            document.body.classList.remove('glitch-effect');
        }, 1000);
        response.textContent = 'GLITCH ACTIVATED';
    } else if (commands[command]) {
        response.textContent = typeof commands[command] === 'function' 
            ? commands[command]() 
            : commands[command];
    } else {
        response.textContent = `Command not found: ${command}. Type 'help' for available commands.`;
    }
    
    output.appendChild(response);
    playTypeSound();
    
    // Auto scroll to bottom
    output.scrollTop = output.scrollHeight;
}

// System Status Update
function updateSystemStatus() {
    const statusMessages = [
        "System operational",
        "Security protocols active",
        "All connections secure",
        "Profile synchronized",
        "Memory optimized",
        "Network stable"
    ];
    
    const systemMessage = document.querySelector('.system-message');
    let index = 0;
    
    function updateMessage() {
        systemMessage.textContent = `[SYSTEM]: ${statusMessages[index]}`;
        systemMessage.style.opacity = '0';
        
        setTimeout(() => {
            systemMessage.style.transition = 'opacity 0.5s';
            systemMessage.style.opacity = '1';
        }, 50);
        
        index = (index + 1) % statusMessages.length;
        setTimeout(updateMessage, 5000);
    }
    
    updateMessage();
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', function() {
    // Set current year
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Initialize all features
    initMatrixRain();
    initTerminal();
    initTypingText();
    initParticles();
    initTerminalCommands();
    
    // Start animations with delays
    setTimeout(() => {
        animateStats();
        animateConnections();
        animateLogs();
        updateSystemStatus();
    }, 2000);
    
    // Random glitch effect interval
    setInterval(randomGlitch, 3000);
    
    // Terminal sound on page load
    setTimeout(() => {
        playTypeSound();
    }, 500);
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            to { opacity: 0; transform: scale(0.9); }
        }
        
        .glitch-effect {
            animation: glitch 0.3s infinite;
        }
        
        .cursor {
            animation: blink 1s infinite;
        }
        
        .command-input {
            background: transparent;
            border: none;
            outline: none;
            color: #00b3ff;
            font-family: 'Share Tech Mono', monospace;
            font-size: 0.9rem;
            width: 70%;
        }
        
        .matrix-column {
            line-height: 1.2;
            white-space: pre;
        }
    `;
    document.head.appendChild(style);
});

// Window resize handling
window.addEventListener('resize', function() {
    const matrixBg = document.getElementById('matrixBg');
    matrixBg.innerHTML = '';
    initMatrixRain();
});

// Add hover sound effects
document.querySelectorAll('.neon-button, .card-header').forEach(element => {
    element.addEventListener('mouseenter', () => {
        playTypeSound();
    });
});