const uniqeLevels = [
    'Single A',
    'Double A',
    'Triple A'
]

const uniqeLVersions = [
    'v2.1',
    'v2.2'
]

const uniqeCategories = [
    "Audio and video",
    "Colour",
    "Content",
    "Custom controls",
    "Dynamic content",
    "Font size",
    "Forms and UI",
    "Keyboard",
    "Link",
    "Quick win",
    "Structure"
];

const filterContainerElment = document.getElementById('filters');

function handleFilterClose(name) {
    filterContainerElment.removeChild(document.getElementsByName(name)[0])
}

const filterButtons = [uniqeLevels, uniqeLVersions, uniqeCategories]
    .flat()
    .map((name, idx) => `<span
                  class="m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900"
                  name="${name}"
                >
                  <span>${name}</span>
                  <button
                    type="button"
                    class="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                    onclick="handleFilterClose('${name}')"
                  >
                    <span class="sr-only">Remove filter for Objects</span>
                    <svg
                      class="h-2 w-2"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 8 8"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-width="1.5"
                        d="M1 1l6 6m0-6L1 7"
                      />
                    </svg>
                  </button>
                </span>`
    )

filterContainerElment.innerHTML = filterButtons.join('')