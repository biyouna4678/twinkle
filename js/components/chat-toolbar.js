// js/components/chat-toolbar.js
class ChatToolbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <!-- ================= 底部输入区 ================= -->
      <div class="shrink-0 w-full z-50 mt-auto bg-transparent relative">
          <!-- 👇 输入框：使用内联样式动态计算底部安全距离 + 16px的呼吸感 -->
          <div class="px-4" style="padding-bottom: calc(env(safe-area-inset-bottom) + 16px);">
              <div class="wet-glass rounded-[26px] h-[52px] p-1 px-2 flex items-center gap-1.5 w-full shadow-lg">
                  <button class="shrink-0 p-1 rounded-full hover:bg-white/20 transition-colors"><img src="https://i.ibb.co/tTcTvwCX/731-20261005164940.png" class="w-6 h-6 object-contain"></button>
                  <textarea rows="1" x-model="messageText" @keydown.enter.prevent="sendMessage()" placeholder="Send message..." class="flex-1 min-w-0 bg-transparent py-2 px-1 text-[15px] leading-snug text-gray-900 outline-none placeholder:text-gray-500 resize-none max-h-[38px] overflow-y-auto"></textarea>
                  
                  <template x-if="!hasText()">
                      <div class="flex items-center gap-1 shrink-0">
                          <button class="p-1 rounded-full hover:bg-white/20"><img src="https://i.ibb.co/LdWwXVF4/731-20261005164859.png" class="w-6 h-6 object-contain"></button>
                          <!-- 完美修复点：防抢焦点，防默认双击，只走 click -->
                          <button type="button" 
                                  @mousedown.prevent 
                                  @touchstart.prevent
                                  @click="showToolsPanel = !showToolsPanel;" 
                                  :class="{'bg-white/30': showToolsPanel}" 
                                  class="p-1 rounded-full hover:bg-white/20 flex items-center justify-center shrink-0 w-8 h-8">
                              <img src="https://i.ibb.co/WNDxx6q1/739-20261031094001.png" class="w-7 h-7 object-contain scale-125">
                          </button>
                      </div>
                  </template>
                  <template x-if="hasText()">
                      <div class="flex items-center gap-1 shrink-0">
                          <button @click="sendMessage()" class="w-8 h-8 bg-black rounded-full flex items-center justify-center transition-transform active:scale-90">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 text-white"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" /></svg>
                          </button>
                      </div>
                  </template>
              </div>
          </div>

          <!-- 工具栏：严格 grid 动画，内层加 overflow-hidden -->
          <div class="grid-transition w-full" :class="showToolsPanel ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
              <div class="min-h-0 overflow-hidden">
                  <!-- 👇 给弹出的工具栏也加上底部安全区，防止小黑条遮挡里面的按钮 -->
                  <div class="bg-[#f3f4f6] w-full rounded-t-[28px] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] border-t border-white/60 flex flex-col h-[330px]" style="padding-bottom: env(safe-area-inset-bottom);" @touchstart="handleTouchStart($event)" @touchend="handleTouchEnd($event)">
                      <div class="w-10 h-1.5 bg-gray-300 rounded-full mx-auto mt-4 mb-2 shrink-0"></div>
                      <div class="flex-1 relative px-4 pt-2">
                          <div x-show="currentPage === 0" x-transition.opacity class="grid grid-cols-4 gap-y-4 gap-x-2 w-full">
                              <template x-for="(item, index) in page1" :key="index">
                                  <div class="flex flex-col items-center gap-1.5 cursor-pointer group" 
                                       @click="
                                          if (item.name === '图片') { openFilePicker(); showToolsPanel = false; }
                                          else if (item.name === '拍摄') { openCamera(); showToolsPanel = false; }
                                          else if (item.name === '语音通话') { startCall('voice', 'calling'); showToolsPanel = false; }
                                          else if (item.name === '视频通话') { startCall('video', 'calling'); showToolsPanel = false; }
                                          else if (item.name === '位置') { showLocationModal = true; showToolsPanel = false; }
                                          else if (item.name === '转账') { isTransferModalOpen = true; showToolsPanel = false; }
                                          else { showToolsPanel = false; }
                                       ">
                                      <div class="w-[64px] h-[64px] bg-white rounded-[22px] flex items-center justify-center shadow-sm group-active:scale-95 transition-transform">
                                          <img :src="item.icon" class="w-10 h-10 object-contain opacity-[0.65] grayscale">
                                      </div>
                                      <span class="text-[13px] text-gray-800 font-medium whitespace-nowrap" x-text="item.name"></span>
                                  </div>
                              </template>
                          </div>
                          <div x-show="currentPage === 1" x-transition.opacity class="grid grid-cols-4 gap-y-4 gap-x-2 w-full absolute top-2 left-0 px-4">
                              <template x-for="(item, index) in page2" :key="index">
                                  <div class="flex flex-col items-center gap-1.5 cursor-pointer group" @click="showToolsPanel = false">
                                      <div class="w-[64px] h-[64px] bg-white rounded-[22px] flex items-center justify-center shadow-sm group-active:scale-95 transition-transform">
                                          <img :src="item.icon" class="w-10 h-10 object-contain opacity-[0.65] grayscale">
                                      </div>
                                      <span class="text-[13px] text-gray-800 font-medium whitespace-nowrap" x-text="item.name"></span>
                                  </div>
                              </template>
                          </div>
                      </div>
                      <div class="flex items-center justify-center pb-8 pt-2 shrink-0">
                          <div class="flex items-center gap-2">
                              <button @click="currentPage = 0" :class="currentPage === 0 ? 'bg-gray-500' : 'bg-gray-300'" class="w-2 h-2 rounded-full transition-colors"></button>
                              <button @click="currentPage = 1" :class="currentPage === 1 ? 'bg-gray-500' : 'bg-gray-300'" class="w-2 h-2 rounded-full transition-colors"></button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    `;
  }
}
customElements.define('chat-toolbar', ChatToolbar);