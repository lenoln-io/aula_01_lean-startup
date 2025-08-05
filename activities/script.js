let currentActivity = null;
let teamData = {};
let problemsList = [];
let timerInterval;
let selectedRole = "";

// Timer functionality
function startTimer(minutes, activity) {
	clearInterval(timerInterval);
	let seconds = minutes * 60;
	currentActivity = activity;

	const timerDisplay = document.createElement("div");
	timerDisplay.id = "timerDisplay";
	timerDisplay.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #ef4444, #dc2626);
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                font-size: 1.2em;
                font-weight: bold;
                box-shadow: 0 8px 25px rgba(239, 68, 68, 0.3);
                z-index: 1000;
            `;

	document.body.appendChild(timerDisplay);

	timerInterval = setInterval(() => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		timerDisplay.textContent = `⏰ ${mins}:${secs.toString().padStart(2, "0")}`;

		if (seconds <= 0) {
			clearInterval(timerInterval);
			timerDisplay.style.background =
				"linear-gradient(135deg, #22c55e, #16a34a)";
			timerDisplay.textContent = "✅ Tempo Esgotado!";

			setTimeout(() => {
				timerDisplay.remove();
				completeActivity(activity);
			}, 3000);
		}
		seconds--;
	}, 1000);
}

function completeActivity(activity) {
	const stepMap = {
		mindmap: 1,
		analysis: 2,
		brainstorm: 3,
		team: 4,
		canvas: 5,
	};

	const stepNumber = stepMap[activity];
	const stepElement = document.getElementById(`step${stepNumber}`);

	if (stepElement) {
		stepElement.classList.remove("current");
		stepElement.classList.add("completed");

		// Move to next step
		const nextStep = document.getElementById(`step${stepNumber + 1}`);
		if (nextStep) {
			nextStep.classList.add("current");
		}
	}

	showCompletionMessage(activity);
}

function showCompletionMessage(activity) {
	const messages = {
		mindmap: "🧠 Mapa Mental concluído! Vocês consolidaram bem os conceitos.",
		analysis:
			"🔍 Análise concluída! Agora vocês entendem melhor como startups sociais aplicam Lean Startup.",
		brainstorm:
			"💡 Brainstorming finalizado! Que problemas interessantes vocês identificaram.",
		team: "👥 Equipe formada! Agora todos sabem suas responsabilidades.",
		canvas:
			"🎯 Canvas do MVP concluído! Vocês têm uma base sólida para começar o desenvolvimento.",
	};

	alert(messages[activity]);
}

// Mind Map functionality
function showMindMapExample() {
	const example = `
            🧠 EXEMPLO DE MAPA MENTAL:

            LEAN STARTUP (centro)
            │
            ├── 🎯 PRINCÍPIOS
            │   ├── Desenvolvimento de Clientes
            │   ├── Eliminação de Desperdícios
            │   └── Aprendizado Contínuo
            │
            ├── 🔄 CICLO BML
            │   ├── Build (Construir MVP)
            │   ├── Measure (Medir Resultados)
            │   └── Learn (Aprender e Ajustar)
            │
            ├── 🔑 CONCEITOS-CHAVE
            │   ├── MVP (Produto Mínimo Viável)
            │   ├── Pivô (Mudança Estratégica)
            │   └── Validação de Hipóteses
            │
            └── ✅ BENEFÍCIOS
                ├── Redução de Riscos
                ├── Eficiência de Recursos
                └── Time-to-Market Rápido

            Use cores diferentes para cada ramificação!
            `;

	alert(example);
}

// Case Analysis functionality
let selectedCase = "";

function selectCase(caseId) {
	// Hide all case details
	document.getElementById("case-gerando").style.display = "none";
	document.getElementById("case-artemisia").style.display = "none";
	document.getElementById("case-bela").style.display = "none";

	// Show selected case
	const caseMap = {
		"gerando-falcoes": "case-gerando",
		artemisia: "case-artemisia",
		"bela-gil": "case-bela",
	};

	document.getElementById(caseMap[caseId]).style.display = "block";
	selectedCase = caseId;

	// Update analysis canvas with case-specific prompts
	updateAnalysisPrompts(caseId);
}

function updateAnalysisPrompts(caseId) {
	const prompts = {
		"gerando-falcoes": {
			problem: "Falta de oportunidades nas comunidades periféricas",
			solution: "Começaram com programas locais de liderança",
			measure: "Número de líderes formados, jovens engajados",
			learn: "Expandiram para rede nacional de organizações",
		},
		artemisia: {
			problem: "Falta de apoio para negócios de impacto social",
			solution: "Programa de aceleração focado em impacto",
			measure: "Negócios acelerados, impacto social gerado",
			learn: "Criaram metodologia própria de avaliação de impacto",
		},
		"bela-gil": {
			problem: "Falta de educação sobre alimentação saudável",
			solution: "Plataforma digital com conteúdo educativo",
			measure: "Engajamento, mudanças de hábitos alimentares",
			learn: "Expandiram para produtos e parcerias sustentáveis",
		},
	};

	const casePrompts = prompts[caseId];
	if (casePrompts) {
		document.querySelector(
			"#analysisCanvas .editable-area:nth-of-type(1)",
		).textContent = casePrompts.problem;
		document.querySelector(
			"#analysisCanvas .editable-area:nth-of-type(2)",
		).textContent = casePrompts.solution;
		document.querySelector(
			"#analysisCanvas .editable-area:nth-of-type(3)",
		).textContent = casePrompts.measure;
		document.querySelector(
			"#analysisCanvas .editable-area:nth-of-type(4)",
		).textContent = casePrompts.learn;
	}
}

function generateAnalysisReport() {
	if (!selectedCase) {
		alert("❗ Selecione uma startup para análise primeiro!");
		return;
	}

	const report = `
            📊 RELATÓRIO DE ANÁLISE - ${selectedCase.toUpperCase()}
            
            ================================================================
            
            🎯 PROBLEMA SOCIAL IDENTIFICADO:
            ${document.querySelector("#analysisCanvas .editable-area:nth-of-type(1)").textContent}
            
            💡 SOLUÇÃO INICIAL (MVP):
            ${document.querySelector("#analysisCanvas .editable-area:nth-of-type(2)").textContent}
            
            📊 MÉTRICAS UTILIZADAS:
            ${document.querySelector("#analysisCanvas .editable-area:nth-of-type(3)").textContent}
            
            🧠 APRENDIZADOS E AJUSTES:
            ${document.querySelector("#analysisCanvas .editable-area:nth-of-type(4)").textContent}
            
            ================================================================
            
            ✅ CONCLUSÕES:
            Esta análise mostra como a startup aplicou com sucesso os
            princípios da metodologia Lean Startup para resolver um
            problema social real, validando hipóteses e iterando com
            base no feedback da comunidade beneficiária.
            `;

	// Create a downloadable report
	const blob = new Blob([report], { type: "text/plain" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `analise_${selectedCase}_${new Date().getTime()}.txt`;
	a.click();
	URL.revokeObjectURL(url);

	alert("📄 Relatório gerado e baixado com sucesso!");
}

// Problem Brainstorming functionality
let currentCategory = "";

function addProblemCategory(category) {
	currentCategory = category;
	const canvas = document.getElementById("problemsCanvas");
	const categoryNames = {
		saude: "🏥 Saúde",
		educacao: "📚 Educação",
		ambiente: "🌍 Meio Ambiente",
		inclusao: "🤝 Inclusão Social",
	};

	canvas.innerHTML = `
                <h3>Problemas de ${categoryNames[category]}</h3>
                <input type="text" id="problemInput" placeholder="Digite um problema que vocês observam..." 
                       style="width: 100%; padding: 15px; border: 2px solid #22c55e; border-radius: 8px; font-size: 1em; margin: 15px 0;">
                <button class="btn" onclick="addProblem()">➕ Adicionar Problema</button>
                <div id="problemsList" style="margin-top: 20px;"></div>
            `;

	document
		.getElementById("problemInput")
		.addEventListener("keypress", function (e) {
			if (e.key === "Enter") {
				addProblem();
			}
		});

	displayProblems();
}

function addProblem() {
	const input = document.getElementById("problemInput");
	const problemText = input.value.trim();

	if (problemText) {
		const problem = {
			id: Date.now(),
			category: currentCategory,
			text: problemText,
			priority: 0,
		};

		problemsList.push(problem);
		input.value = "";
		displayProblems();
	}
}

function displayProblems() {
	const container = document.getElementById("problemsList");
	if (!container) return;

	const categoryProblems = problemsList.filter(
		(p) => p.category === currentCategory,
	);

	container.innerHTML = categoryProblems
		.map(
			(problem) => `
                <div class="problem-card" onclick="prioritizeProblem(${problem.id})">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span>${problem.text}</span>
                        <div>
                            <span style="background: #22c55e; color: white; padding: 4px 8px; border-radius: 20px; font-size: 0.8em;">
                                Prioridade: ${problem.priority}
                            </span>
                            <button onclick="removeProblem(${problem.id}); event.stopPropagation();" 
                                    style="background: #ef4444; color: white; border: none; border-radius: 50%; width: 25px; height: 25px; margin-left: 10px; cursor: pointer;">
                                ×
                            </button>
                        </div>
                    </div>
                </div>
            `,
		)
		.join("");
}

function prioritizeProblem(problemId) {
	const problem = problemsList.find((p) => p.id === problemId);
	if (problem) {
		problem.priority = (problem.priority + 1) % 4; // 0-3 priority levels
		displayProblems();
	}
}

function removeProblem(problemId) {
	problemsList = problemsList.filter((p) => p.id !== problemId);
	displayProblems();
}

function exportProblems() {
	if (problemsList.length === 0) {
		alert("❗ Adicione alguns problemas primeiro!");
		return;
	}

	const categories = {
		saude: "🏥 Saúde",
		educacao: "📚 Educação",
		ambiente: "🌍 Meio Ambiente",
		inclusao: "🤝 Inclusão Social",
	};

	let report = "💡 PROBLEMAS SOCIAIS IDENTIFICADOS PELA EQUIPE\n";
	report += "=".repeat(50) + "\n\n";

	Object.keys(categories).forEach((category) => {
		const categoryProblems = problemsList.filter(
			(p) => p.category === category,
		);
		if (categoryProblems.length > 0) {
			report += `${categories[category]}\n`;
			report += "-".repeat(30) + "\n";

			categoryProblems
				.sort((a, b) => b.priority - a.priority)
				.forEach((problem, index) => {
					const stars = "⭐".repeat(problem.priority + 1);
					report += `${index + 1}. ${problem.text} ${stars}\n`;
				});
			report += "\n";
		}
	});

	report += "\n🎯 PRÓXIMOS PASSOS:\n";
	report += "• Pesquisar dados sobre os problemas priorizados\n";
	report += "• Conversar com pessoas afetadas pelos problemas\n";
	report += "• Pensar em soluções tecnológicas viáveis\n";
	report += "• Definir qual problema focar no projeto\n";

	const blob = new Blob([report], { type: "text/plain" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `problemas_sociais_${new Date().getTime()}.txt`;
	a.click();
	URL.revokeObjectURL(url);

	alert("📤 Lista de problemas exportada com sucesso!");
}

// Team Formation functionality
function selectRole(role) {
	selectedRole = role;

	// Remove selection from all roles
	document.querySelectorAll(".role-card").forEach((card) => {
		card.classList.remove("selected");
	});

	// Add selection to clicked role
	event.target.closest(".role-card").classList.add("selected");

	// Show role assignment interface
	showRoleAssignment(role);
}

function showRoleAssignment(role) {
	const roleNames = {
		"product-owner": "🎯 Product Owner",
		"scrum-master": "⚡ Scrum Master",
		developer: "💻 Desenvolvedor",
		designer: "🎨 Designer UX/UI",
		researcher: "🔍 Pesquisador Social",
	};

	const container = document.getElementById("teamMembers");
	container.innerHTML = `
                <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; border: 2px solid #22c55e;">
                    <h4 style="color: #15803d; margin-bottom: 15px;">${roleNames[role]}</h4>
                    <input type="text" id="memberName" placeholder="Nome do membro da equipe..." 
                           style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 5px; margin-bottom: 10px;">
                    <textarea id="memberSkills" placeholder="Habilidades e experiências relevantes..." 
                              style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 5px; height: 80px; margin-bottom: 10px;"></textarea>
                    <button class="btn" onclick="assignRole('${role}')">✅ Atribuir Papel</button>
                    <button class="btn btn-secondary" onclick="showAllRoles()">👁️ Ver Todas as Atribuições</button>
                </div>
            `;
}

function assignRole(role) {
	const nameInput = document.getElementById("memberName");
	const skillsInput = document.getElementById("memberSkills");

	const name = nameInput.value.trim();
	const skills = skillsInput.value.trim();

	if (!name) {
		alert("❗ Digite o nome do membro da equipe!");
		return;
	}

	teamData[role] = {
		name: name,
		skills: skills || "Não especificado",
	};

	alert(`✅ ${name} foi atribuído(a) ao papel de ${role}!`);

	// Clear inputs
	nameInput.value = "";
	skillsInput.value = "";

	// Remove selection
	document.querySelectorAll(".role-card").forEach((card) => {
		card.classList.remove("selected");
	});

	showAllRoles();
}

function showAllRoles() {
	const roleNames = {
		"product-owner": "🎯 Product Owner",
		"scrum-master": "⚡ Scrum Master",
		developer: "💻 Desenvolvedor",
		designer: "🎨 Designer UX/UI",
		researcher: "🔍 Pesquisador Social",
	};

	const container = document.getElementById("teamMembers");
	let html =
		'<h4 style="color: #15803d; margin-bottom: 15px;">👥 Composição da Equipe</h4>';

	Object.keys(roleNames).forEach((role) => {
		const member = teamData[role];
		if (member) {
			html += `
                        <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #22c55e;">
                            <strong>${roleNames[role]}: ${member.name}</strong>
                            <div style="font-size: 0.9em; color: #6b7280; margin-top: 5px;">
                                Habilidades: ${member.skills}
                            </div>
                        </div>
                    `;
		} else {
			html += `
                        <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #d1d5db;">
                            <strong>${roleNames[role]}: <span style="color: #9ca3af;">Não atribuído</span></strong>
                        </div>
                    `;
		}
	});

	container.innerHTML = html;
}

function generateTeamChart() {
	if (Object.keys(teamData).length === 0) {
		alert("❗ Atribua pelo menos um papel primeiro!");
		return;
	}

	const roleNames = {
		"product-owner": "🎯 Product Owner",
		"scrum-master": "⚡ Scrum Master",
		developer: "💻 Desenvolvedor",
		designer: "🎨 Designer UX/UI",
		researcher: "🔍 Pesquisador Social",
	};

	let chart = "👥 ORGANOGRAMA DA EQUIPE TECHSOCIAL\n";
	chart += "=".repeat(50) + "\n\n";

	Object.keys(teamData).forEach((role) => {
		const member = teamData[role];
		chart += `${roleNames[role]}\n`;
		chart += `Nome: ${member.name}\n`;
		chart += `Habilidades: ${member.skills}\n`;
		chart += "-".repeat(30) + "\n\n";
	});

	chart += "🎯 RESPONSABILIDADES POR PAPEL:\n\n";
	chart += "🎯 Product Owner:\n";
	chart += "• Define visão e objetivos do produto\n";
	chart +=
		"• Prioriza funcionalidades baseado nas necessidades dos beneficiários\n";
	chart += "• Valida requisitos com stakeholders\n\n";

	chart += "⚡ Scrum Master:\n";
	chart += "• Facilita reuniões e processos da equipe\n";
	chart += "• Remove obstáculos e impedimentos\n";
	chart += "• Garante seguimento da metodologia Lean Startup\n\n";

	chart += "💻 Desenvolvedor:\n";
	chart += "• Implementa as funcionalidades técnicas\n";
	chart += "• Desenvolve e mantém o código\n";
	chart += "• Realiza testes e correções\n\n";

	chart += "🎨 Designer UX/UI:\n";
	chart += "• Cria wireframes e protótipos\n";
	chart += "• Desenvolve interface visual\n";
	chart += "• Testa usabilidade com usuários\n\n";

	chart += "🔍 Pesquisador Social:\n";
	chart += "• Estuda o problema social\n";
	chart += "• Realiza entrevistas com beneficiários\n";
	chart += "• Valida impacto social da solução\n";

	const blob = new Blob([chart], { type: "text/plain" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `organograma_equipe_${new Date().getTime()}.txt`;
	a.click();
	URL.revokeObjectURL(url);

	alert("📊 Organograma gerado e baixado com sucesso!");
}

// Canvas MVP functionality
function saveCanvas() {
	const canvasData = {};
	const sections = document.querySelectorAll("#mvpCanvas .canvas-section");

	sections.forEach((section, index) => {
		const title = section.querySelector("h5").textContent;
		const content = section.querySelector(".editable-area").textContent;
		canvasData[title] = content;
	});

	localStorage.setItem("mvp_canvas", JSON.stringify(canvasData));
	alert("💾 Canvas salvo localmente!");
}

function shareCanvas() {
	const sections = document.querySelectorAll(".canvas-section .editable-area");
	let canvasText = "🎯 CANVAS DO MVP SOCIAL\n";
	canvasText += "=".repeat(50) + "\n\n";

	const titles = [
		"👥 Beneficiários",
		"⚡ Problema Principal",
		"💡 Solução Proposta",
		"🔧 Features Mínimas",
		"📊 Como Medir Impacto",
		"💰 Sustentabilidade",
		"🤝 Parcerias Necessárias",
		"⚠️ Principais Riscos",
		"🎯 Validação",
	];

	sections.forEach((section, index) => {
		if (titles[index]) {
			canvasText += `${titles[index]}:\n`;
			canvasText += `${section.textContent || "Não preenchido"}\n\n`;
		}
	});

	canvasText +=
		"📅 Data de criação: " + new Date().toLocaleDateString("pt-BR") + "\n";
	canvasText +=
		"👥 Equipe: " +
		Object.values(teamData)
			.map((m) => m.name)
			.join(", ") +
		"\n";

	// Copy to clipboard
	navigator.clipboard
		.writeText(canvasText)
		.then(() => {
			alert("📤 Canvas copiado para a área de transferência!");
		})
		.catch(() => {
			// Fallback for older browsers
			const textArea = document.createElement("textarea");
			textArea.value = canvasText;
			document.body.appendChild(textArea);
			textArea.select();
			document.execCommand("copy");
			document.body.removeChild(textArea);
			alert("📤 Canvas copiado para a área de transferência!");
		});
}

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
	// Add placeholder text functionality
	document.querySelectorAll(".editable-area").forEach((area) => {
		const placeholder = area.getAttribute("placeholder");

		area.addEventListener("focus", function () {
			if (this.textContent === placeholder) {
				this.textContent = "";
				this.style.color = "#000";
			}
		});

		area.addEventListener("blur", function () {
			if (this.textContent.trim() === "") {
				this.textContent = placeholder;
				this.style.color = "#9ca3af";
			}
		});

		// Set initial placeholder
		if (area.textContent.trim() === "") {
			area.textContent = placeholder;
			area.style.color = "#9ca3af";
		}
	});

	// Auto-save functionality
	setInterval(() => {
		const canvasData = {};
		document.querySelectorAll(".editable-area").forEach((area) => {
			if (
				area.textContent &&
				area.textContent !== area.getAttribute("placeholder")
			) {
				canvasData[area.getAttribute("placeholder")] = area.textContent;
			}
		});

		if (Object.keys(canvasData).length > 0) {
			localStorage.setItem("auto_save_canvas", JSON.stringify(canvasData));
		}
	}, 30000); // Auto-save every 30 seconds

	// Load auto-saved data
	const autoSaved = localStorage.getItem("auto_save_canvas");
	if (autoSaved) {
		const data = JSON.parse(autoSaved);
		document.querySelectorAll(".editable-area").forEach((area) => {
			const placeholder = area.getAttribute("placeholder");
			if (data[placeholder]) {
				area.textContent = data[placeholder];
				area.style.color = "#000";
			}
		});
	}
});

// Gamification features
let achievements = [];
let activityPoints = 0;

function addPoints(points, reason) {
	activityPoints += points;
	showPointsNotification(points, reason);

	// Check for achievements
	checkAchievements();
}

function showPointsNotification(points, reason) {
	const notification = document.createElement("div");
	notification.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: linear-gradient(135deg, #fbbf24, #f59e0b);
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                font-weight: bold;
                box-shadow: 0 8px 25px rgba(251, 191, 36, 0.3);
                z-index: 1000;
                animation: slideInLeft 0.5s ease;
            `;

	notification.innerHTML = `
                <div style="font-size: 1.1em;">+${points} pontos! 🎉</div>
                <div style="font-size: 0.9em; opacity: 0.9;">${reason}</div>
            `;

	document.body.appendChild(notification);

	setTimeout(() => {
		notification.remove();
	}, 3000);
}

function checkAchievements() {
	if (activityPoints >= 10 && !achievements.includes("first_steps")) {
		achievements.push("first_steps");
		showAchievement(
			"🚀 Primeiros Passos",
			"Você começou sua jornada no Lean Startup!",
		);
	}

	if (activityPoints >= 25 && !achievements.includes("active_learner")) {
		achievements.push("active_learner");
		showAchievement(
			"📚 Aprendiz Ativo",
			"Você está se dedicando às atividades!",
		);
	}

	if (
		Object.keys(teamData).length >= 3 &&
		!achievements.includes("team_builder")
	) {
		achievements.push("team_builder");
		showAchievement("👥 Formador de Equipes", "Sua equipe está tomando forma!");
	}

	if (problemsList.length >= 5 && !achievements.includes("problem_spotter")) {
		achievements.push("problem_spotter");
		showAchievement(
			"🔍 Identificador de Problemas",
			"Você tem um olhar atento para problemas sociais!",
		);
	}
}

function showAchievement(title, description) {
	const achievement = document.createElement("div");
	achievement.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #8b5cf6, #7c3aed);
                color: white;
                padding: 30px;
                border-radius: 20px;
                text-align: center;
                box-shadow: 0 20px 40px rgba(139, 92, 246, 0.3);
                z-index: 1001;
                animation: achievementPop 0.6s ease;
                max-width: 400px;
            `;

	achievement.innerHTML = `
                <div style="font-size: 3em; margin-bottom: 15px;">🏆</div>
                <div style="font-size: 1.4em; font-weight: bold; margin-bottom: 10px;">${title}</div>
                <div style="font-size: 1em; opacity: 0.9;">${description}</div>
                <button onclick="this.parentElement.remove()" 
                        style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 10px 20px; border-radius: 20px; margin-top: 20px; cursor: pointer;">
                    ✨ Incrível!
                </button>
            `;

	document.body.appendChild(achievement);
}

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
            @keyframes slideInLeft {
                from {
                    transform: translateX(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes achievementPop {
                0% {
                    transform: translate(-50%, -50%) scale(0.3);
                    opacity: 0;
                }
                50% {
                    transform: translate(-50%, -50%) scale(1.1);
                }
                100% {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 1;
                }
            }
        `;
document.head.appendChild(style);

// Add event listeners for points
document.addEventListener("click", function (e) {
	if (e.target.classList.contains("btn")) {
		addPoints(2, "Interação com atividade");
	}

	if (e.target.classList.contains("activity-card")) {
		addPoints(1, "Exploração de conteúdo");
	}
});

document.addEventListener("input", function (e) {
	if (
		e.target.classList.contains("editable-area") ||
		e.target.type === "text" ||
		e.target.tagName === "TEXTAREA"
	) {
		addPoints(1, "Contribuição com conteúdo");
	}
});
