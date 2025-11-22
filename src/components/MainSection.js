// Main section with hero card
export function createMainSection() {
  return `
    <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Instalación limpia</h2>
      <p class="text-gray-600 mb-4">
        Este proyecto usa Vite + Tailwind CSS v4 con una configuración minimalista y optimizada.
      </p>
      <div class="flex gap-4">
        <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200">
          Comenzar
        </button>
        <button class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-200">
          Documentación
        </button>
      </div>
    </div>
  `;
}
