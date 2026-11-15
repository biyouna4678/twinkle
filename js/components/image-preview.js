// js/components/image-preview.js
class ImagePreview extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div x-show="showImagePreview" x-transition.opacity class="fixed inset-0 z-[500] bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center" style="display: none;" @click.self="showImagePreview = false">
          <img :src="previewImageUrl" class="max-w-[90vw] max-h-[75vh] object-contain rounded-xl shadow-2xl mb-12">
          <div class="flex items-center gap-10">
              <button @click="saveImage(previewImageUrl)" class="wet-glass w-14 h-14 rounded-full flex flex-col items-center justify-center text-gray-800 active:scale-90 transition-transform shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
              </button>
              <button @click="showImagePreview = false" class="wet-glass w-14 h-14 rounded-full flex flex-col items-center justify-center text-gray-800 active:scale-90 transition-transform shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
          </div>
      </div>
    `;
  }
}
customElements.define('image-preview', ImagePreview);
