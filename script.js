let currentProgress = 0;

function updateProgress() {
	currentProgress += 10;
	if (currentProgress > 100) currentProgress = 100;
	document.getElementById("progressBar").style.width = `${currentProgress}%`;
}

function _showDetails(type) {
	const messages = {
		efficiency:
			"💡 A eficiência na Lean Startup significa fazer mais com menos, testando ideias rapidamente sem gastar recursos desnecessários.",
		learning:
			"📚 O aprendizado contínuo é fundamental: cada teste, cada feedback, cada métrica nos ensina algo novo sobre nossos clientes e produto.",
		risk: "🛡️ Reduzir riscos significa validar hipóteses antes de investir tempo e dinheiro significativos no desenvolvimento.",
	};

	alert(messages[type]);
	updateProgress();
}

function _explainStep(step) {
	const explanations = {
		build:
			"🔨 BUILD (Construir): Desenvolva um MVP (Produto Mínimo Viável) com as funcionalidades essenciais para testar sua hipótese principal.",
		measure:
			"📊 MEASURE (Medir): Colete dados reais sobre como os usuários interagem com seu MVP. Use métricas quantitativas e qualitativas.",
		learn:
			"🧠 LEARN (Aprender): Analise os dados coletados e decida: continuar, ajustar ou pivotar. O aprendizado guia a próxima iteração do ciclo.",
	};

	document.getElementById("stepExplanation").innerHTML = `
                <div style="font-size: 1.1em; color: #15803d; font-weight: bold;">
                    ${explanations[step]}
                </div>
            `;
}

function _explainConcept(concept) {
	const explanations = {
		efficiency:
			"💡 A eficiência na Lean Startup significa fazer mais com menos, testando ideias rapidamente sem gastar recursos desnecessários.",
		learning:
			"📚 O aprendizado contínuo é fundamental: cada teste, cada feedback, cada métrica nos ensina algo novo sobre nossos clientes e produto.",
		risk: "🛡️ Reduzir riscos significa validar hipóteses antes de investir tempo e dinheiro significativos no desenvolvimento.",
	};

	document.getElementById("conceptExplanation").innerHTML = `
                <div style="font-size: 1.1em; color: #15803d; font-weight: bold;">
                    ${explanations[concept]}
                </div>
            `;
}

function _checkAnswer(element, isCorrect) {
	// Remove classes anteriores de todas as opções na mesma questão
	const options = element.parentElement.children;
	for (const option of options) {
		option.classList.remove("correct", "incorrect");
	}

	// Adiciona a classe apropriada
	if (isCorrect) {
		element.classList.add("correct");
		element.innerHTML += " ✅";
	} else {
		element.classList.add("incorrect");
		element.innerHTML += " ❌";

		// Mostra a resposta correta
		for (const option of options) {
			if (option.onclick.toString().includes("true")) {
				option.classList.add("correct");
				option.innerHTML += " ✅ (Resposta correta)";
				break;
			}
		}
	}
	updateProgress();
}

function _resetQuiz() {
	const options = document.querySelectorAll(".quiz-option");
	options.forEach((option) => {
		option.classList.remove("correct", "incorrect");
		option.innerHTML = option.innerHTML
			.replace(/ ✅.*$/, "")
			.replace(/ ❌.*$/, "");
	});
}

function showProjectPhases() {
	const phases = `
            📅 CRONOGRAMA DO PROJETO TECHSOCIAL:
            
            🔍 Semana 1-2: Identificação e Validação do Problema
            • Pesquisa de campo na comunidade
            • Entrevistas com possíveis beneficiários
            • Definição do problema a ser resolvido
            
            💡 Semana 3-4: Ideação e Prototipagem
            • Brainstorming de soluções
            • Criação de wireframes e mockups
            • Validação da ideia com stakeholders
            
            🔨 Semana 5-8: Desenvolvimento do MVP
            • Programação da solução mínima viável
            • Testes internos e ajustes
            • Preparação para testes com usuários
            
            📊 Semana 9-12: Testes e Iterações
            • Testes com usuários reais
            • Coleta de feedback e métricas
            • Ajustes baseados no aprendizado
            
            🚀 Semana 13-16: Refinamento e Escala
            • Melhorias no produto
            • Plano de sustentabilidade
            • Preparação da apresentação final
            
            🏆 Semana 17-20: Apresentação e Implementação
            • Pitch para investidores sociais
            • Implementação piloto na comunidade
            • Avaliação de impacto social
            `;

	alert(phases);
	updateProgress();
}

function startBrainstorming() {
	const tips = `
            💡 DICAS PARA O BRAINSTORMING:
            
            1. 🚫 Sem julgamentos: Todas as ideias são válidas inicialmente
            2. 🌊 Quantidade primeiro: Gerem muitas ideias antes de filtrar
            3. 🔄 Construam sobre ideias dos outros
            4. 🎯 Mantenham o foco em problemas sociais reais
            5. 📝 Documentem tudo: até as ideias "malucas" podem ser úteis
            
            🎯 PERGUNTAS ORIENTADORAS:
            • Que problemas vocês veem no dia a dia da comunidade?
            • Que dificuldades seus familiares e vizinhos enfrentam?
            • Que serviços públicos poderiam funcionar melhor?
            • Que grupos vulneráveis precisam de mais apoio?
            • Como a tecnologia poderia ajudar nesses casos?
            
            ⏰ Tempo: 20 minutos de brainstorming intenso!
            `;

	alert(tips);
	updateProgress();
}

function showResources() {
	const resources = `
            📚 RECURSOS ADICIONAIS:
            
            📖 Livros:
            • "A Startup Enxuta" - Eric Ries
            • "Inovação Social" - André Lara Resende
            
            🎬 Vídeos:
            • "The Lean Startup Methodology" (TED Talk)
            • Cases de startups sociais brasileiras
            
            🌐 Sites:
            • Artemisia (artemisia.org.br)
            • Gerando Falcões (gerandofalcoes.com)
            • Ashoka Brasil (ashoka.org.br)
            
            🛠️ Ferramentas:
            • Canvas de Modelo de Negócios
            • Trello para gestão de projetos
            • Google Forms para pesquisas
            • Figma para prototipagem
            `;

	alert(resources);
}

function _goToActivities() {
	window.location.href = "./activities/";
}

function _scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
}

// Adiciona interatividade aos slides
document.addEventListener("DOMContentLoaded", () => {
	const slides = document.querySelectorAll(".slide");

	// Observer para animar slides quando entram na tela
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.style.opacity = "1";
					entry.target.style.transform = "translateY(0)";
					updateProgress();
				}
			});
		},
		{
			threshold: 0.1,
		},
	);

	slides.forEach((slide) => {
		slide.style.opacity = "0";
		slide.style.transform = "translateY(30px)";
		slide.style.transition = "all 0.6s ease";
		observer.observe(slide);
	});

	// Adiciona efeito de typing animation no título
	const title = document.querySelector("h1");
	if (title) {
		const text = title.textContent;
		title.textContent = "";
		let i = 0;

		function typeWriter() {
			if (i < text.length) {
				title.textContent += text.charAt(i);
				i++;
				setTimeout(typeWriter, 100);
			}
		}

		setTimeout(typeWriter, 500);
	}
});

// Adiciona tooltips interativos
document.querySelectorAll(".concept-card").forEach((card) => {
	card.addEventListener("mouseenter", function () {
		this.style.transform = "translateY(-8px) scale(1.02)";
	});

	card.addEventListener("mouseleave", function () {
		this.style.transform = "translateY(0) scale(1)";
	});
});

// Sistema de gamificação simples
const score = 0;
const achievements = [];

function addAchievement(name, description) {
	if (!achievements.includes(name)) {
		achievements.push(name);
		showAchievement(name, description);
	}
}

function showAchievement(name, description) {
	const achievement = document.createElement("div");
	achievement.innerHTML = `
                <div style="
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #fbbf24, #f59e0b);
                    color: white;
                    padding: 15px 20px;
                    border-radius: 10px;
                    box-shadow: 0 8px 25px rgba(245, 158, 11, 0.3);
                    z-index: 1001;
                    animation: slideInRight 0.5s ease;
                ">
                    <div style="font-weight: bold; font-size: 1.1em;">🏆 ${name}</div>
                    <div style="font-size: 0.9em; opacity: 0.9;">${description}</div>
                </div>
            `;

	document.body.appendChild(achievement);

	setTimeout(() => {
		achievement.remove();
	}, 3000);
}

// Adiciona CSS para animações
const style = document.createElement("style");
style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes bounce {
                0%, 20%, 53%, 80%, 100% {
                    transform: translate3d(0,0,0);
                }
                40%, 43% {
                    transform: translate3d(0, -30px, 0);
                }
                70% {
                    transform: translate3d(0, -15px, 0);
                }
                90% {
                    transform: translate3d(0, -4px, 0);
                }
            }
        `;
document.head.appendChild(style);

// Monitora interações para dar achievements
let interactionCount = 0;
document.addEventListener("click", (e) => {
	if (
		e.target.classList.contains("interactive-element") ||
		e.target.classList.contains("btn") ||
		e.target.classList.contains("quiz-option")
	) {
		interactionCount++;

		if (interactionCount === 3) {
			addAchievement(
				"Explorador",
				"Você está explorando ativamente o conteúdo!",
			);
		}

		if (interactionCount === 7) {
			addAchievement("Curioso", "Sua curiosidade é inspiradora!");
		}

		if (interactionCount === 15) {
			addAchievement(
				"Expert em Lean",
				"Você dominou os conceitos fundamentais!",
			);
		}
	}
});
