// Card Component
export function createCard({ icon, title, description }) {
  return `
    <div class="bg-white p-6 rounded-lg shadow hover:shadow-xl transition-shadow">
      <div class="text-blue-500 text-3xl mb-3">${icon}</div>
      <h3 class="font-bold text-lg mb-2">${title}</h3>
      <p class="text-gray-600 text-sm">${description}</p>
    </div>
  `;
}
