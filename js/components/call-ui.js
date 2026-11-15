// js/components/call-ui.js
class CallUI extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <!-- ================= 语音通话 ================= -->
      <div x-show="callType === 'voice' && callState !== 'idle' && !isMinimized" x-transition.opacity class="fixed inset-0 z-[100] flex flex-col justify-between pt-14 pb-10 px-6 bg-gray-900 overflow-hidden" style="display: none;">
          <div class="absolute inset-0 z-0 bg-black"></div>
          <div class="flex justify-between items-center w-full shrink-0 relative z-30">
              <button @click="toggleMinimize()" class="w-12 h-12 rounded-full dark-glass flex items-center justify-center text-white shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
              </button>
              <div class="flex-1 flex flex-col items-center justify-center pointer-events-none">
                  <div x-show="callState === 'active'" class="flex flex-col items-center">
                      <span class="text-white/90 text-[13px] tracking-wide">语音通话中</span>
                      <span class="text-white/80 text-[11px] font-mono mt-0.5" x-text="callTimer"></span>
                  </div>
              </div>
              <div class="relative shrink-0">
                  <button @click="showCallSettings = !showCallSettings" class="w-12 h-12 rounded-full dark-glass flex items-center justify-center text-white relative z-[100]">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" /></svg>
                  </button>
                  <div x-show="showCallSettings" @click="showCallSettings = false" class="fixed inset-0 z-[90] bg-transparent"></div>
                  <div x-show="showCallSettings" class="absolute right-0 top-14 w-[200px] ios-menu rounded-2xl overflow-hidden text-[15px] text-white z-[100] pointer-events-auto" style="display: none;">
                      <button type="button" @click.stop="startMode = 'them'" class="w-full text-left flex justify-between items-center px-4 py-3 border-b border-white/10 active:bg-white/20"><span>对方先说</span><svg x-show="startMode === 'them'" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" /></svg></button>
                      <button type="button" @click.stop="startMode = 'me'" class="w-full text-left flex justify-between items-center px-4 py-3 border-b border-white/10 active:bg-white/20"><span>我先说</span><svg x-show="startMode === 'me'" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" /></svg></button>
                      <button type="button" @click.stop="subtitlesOn = !subtitlesOn" class="w-full text-left flex justify-between items-center px-4 py-3 active:bg-white/20"><span>字幕显示</span><span class="text-gray-400 text-sm" x-text="subtitlesOn ? '已开启' : '已关闭'"></span></button>
                  </div>
              </div>
          </div>
          <div class="flex flex-col items-center justify-center flex-1 w-full mt-2 relative z-10 pointer-events-none">
              <div class="relative flex items-center justify-center w-56 h-56 mb-6 shrink-0 pointer-events-auto">
                  <div class="relative rounded-full border-[3px] border-gray-400/50 shadow-2xl z-10 overflow-hidden" :class="callState === 'receiving' ? 'w-36 h-36' : 'w-28 h-28'">
                      <img src="https://i.ibb.co/3mf7FgyL/IMG-6559.jpg" class="w-full h-full object-cover">
                  </div>
                  <div class="absolute pointer-events-none z-0" :class="callState === 'receiving' ? 'w-36 h-36' : 'w-28 h-28'">
                      <div class="ripple-ring" :class="callState === 'active' ? 'ripple-active' : ''" style="animation-delay: 0s;"></div>
                      <div class="ripple-ring" :class="callState === 'active' ? 'ripple-active' : ''" style="animation-delay: 1s;"></div>
                      <div class="ripple-ring" :class="callState === 'active' ? 'ripple-active' : ''" style="animation-delay: 2s;"></div>
                  </div>
              </div>
              <h1 class="text-white text-2xl font-bold tracking-widest mb-4">Yosali</h1>
              <div class="h-6 mb-2 shrink-0">
                  <div x-show="callState === 'calling'" class="text-gray-300 text-sm">正在邀请对方进行语音通话…</div>
                  <div x-show="callState === 'receiving'" class="text-gray-300 text-sm animate-pulse">对方正在邀请你进行语音通话…</div>
              </div>
              <div x-show="callState === 'active' && subtitlesOn" x-ref="subtitleBox" class="w-full max-w-[85%] max-h-[160px] overflow-y-auto flex flex-col gap-3 relative px-2 pointer-events-auto hide-scrollbar mb-6" style="mask-image: linear-gradient(to bottom, transparent, black 10%, black 100%); -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 100%);">
                  <template x-for="(sub, index) in voiceSubtitles" :key="index">
                      <div class="flex flex-col items-center animate-fade-in-up">
                          <div class="text-center text-[15px]"><span class="text-gray-400 text-[11px] mr-1" x-text="sub.speaker + ':'"></span><span class="text-white font-medium" x-text="sub.original"></span></div>
                          <div x-show="sub.translation" class="text-center text-[13px] mt-0.5"><span class="text-gray-400 italic" x-text="'tr. ' + sub.translation"></span></div>
                      </div>
                  </template>
                  <div x-show="interimTranscript.length > 0" class="flex flex-col items-center">
                      <div class="text-center text-[15px]"><span class="text-gray-400 text-[11px] mr-1">Me:</span><span class="text-white/70 font-medium" x-text="interimTranscript + '...'"></span></div>
                  </div>
              </div>
          </div>
          <div class="w-full shrink-0 flex flex-col gap-6 relative z-10">
              <div class="flex justify-center items-center gap-8 h-20">
                  <div x-show="callState === 'active' || callState === 'calling' || callState === 'receiving'" class="flex flex-col items-center gap-2">
                      <button @click="endCall()" class="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7"><path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clip-rule="evenodd" transform="rotate(135 12 12)" /></svg></button>
                      <span class="text-gray-300 text-xs" x-text="callState === 'receiving' ? '拒绝' : '挂断'"></span>
                  </div>
                  <div x-show="callState === 'active'" class="flex flex-col items-center gap-2 cursor-pointer" @click="toggleMic()">
                      <button class="w-16 h-16 rounded-full flex items-center justify-center shadow-lg relative" :class="micOn ? 'bg-white text-black' : 'bg-gray-400 text-white'">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7"><rect x="8" y="2" width="8" height="12" rx="4" /><path d="M5 11a7 7 0 0 0 14 0v-1h-2v1a5 5 0 0 1-10 0v-1H5v1z" /><rect x="11" y="17" width="2" height="3" /><rect x="8" y="20" width="8" height="2" rx="1" /></svg>
                          <div x-show="isListening" class="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white recording-dot"></div>
                      </button>
                      <span class="text-gray-300 text-xs" x-text="micOn ? '麦克风' : '已静音'"></span>
                  </div>
                  <div x-show="callState === 'active'" class="flex flex-col items-center gap-2">
                      <button class="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-7 h-7"><path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg></button>
                      <span class="text-gray-300 text-xs">扬声器</span>
                  </div>
                  <div x-show="callState === 'receiving'" class="flex flex-col items-center gap-2">
                      <button @click="acceptCall()" class="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(34,197,94,0.4)] animate-bounce"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7"><path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clip-rule="evenodd" /></svg></button>
                      <span class="text-gray-300 text-xs">接听</span>
                  </div>
              </div>
          </div>
      </div>

      <!-- ================= 视频通话 ================= -->
      <div x-show="callType === 'video' && callState !== 'idle' && !isMinimized" x-transition.opacity class="fixed inset-0 z-[100] flex flex-col justify-between pt-12 pb-8 px-4 bg-[#121212] overflow-hidden" style="display: none;">
          <div class="absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-500" :class="callState === 'active' ? 'opacity-100' : 'opacity-0'" style="background-image: url('https://i.ibb.co/1G5BT8Kg/IMG-9202.jpg');"></div>
          <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none z-0" :class="callState === 'active' ? 'opacity-100' : 'opacity-0'"></div>
          <div class="relative z-10 flex justify-between items-center w-full shrink-0 h-12">
              <button @click="toggleMinimize()" class="w-12 h-12 rounded-full dark-glass flex items-center justify-center text-white z-20">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 9l-4.5-4.5m0 0h4.5m-4.5 0v4.5" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 15l4.5 4.5m0 0h-4.5m4.5 0v-4.5" /></svg>
              </button>
              <div x-show="callState === 'active'" class="text-white font-mono text-[15px]" x-text="callTimer"></div>
              <div class="w-12 h-12 z-20"></div>
          </div>
          <div x-show="callState === 'active'" class="absolute top-16 right-6 w-28 h-40 bg-gray-900 rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.5)] z-20 flex flex-col">
              <div class="relative w-full h-full bg-[#1a1a1a] flex items-center justify-center">
                  <video x-show="cameraOn" x-ref="videoElement" autoplay playsinline muted class="w-full h-full object-cover transform" :class="isFrontCamera ? 'scale-x-[-1]' : ''"></video>
                  <div x-show="!cameraOn" class="absolute inset-0 w-full h-full flex items-center justify-center">
                      <img src="https://i.ibb.co/BKtnrG9B/IMG-6557.jpg" class="absolute inset-0 w-full h-full object-cover blur-md opacity-40 scale-125">
                      <img src="https://i.ibb.co/BKtnrG9B/IMG-6557.jpg" class="relative w-14 h-14 rounded-lg object-cover z-10">
                  </div>
              </div>
          </div>
          <div class="relative z-10 flex-1 w-full flex flex-col overflow-hidden pointer-events-none mt-0 mb-4">
              <div x-show="callState === 'calling' || callState === 'receiving'" class="flex flex-col items-center justify-center h-full gap-4 -translate-y-12 pointer-events-auto">
                  <div class="w-32 h-32 rounded-[32px] overflow-hidden shadow-2xl border-2 border-white/10 relative">
                      <img src="https://i.ibb.co/3mf7FgyL/IMG-6559.jpg" class="w-full h-full object-cover">
                      <div class="absolute inset-0 bg-black/10 animate-pulse"></div>
                  </div>
                  <h1 class="text-white text-2xl font-bold tracking-widest mt-2">Yosali</h1>
                  <p x-show="callState === 'receiving'" class="text-gray-300 text-[14px] animate-pulse">邀请你视频通话…</p>
                  <p x-show="callState === 'calling'" class="text-gray-300 text-[14px]">正在等待对方接听…</p>
              </div>
              <div x-show="callState === 'active'" class="flex flex-col justify-end h-full">
                  <div x-show="videoSubtitlesOn" x-ref="videoSubtitleBox" class="w-full max-h-[300px] overflow-y-auto flex flex-col gap-4 px-2 pointer-events-auto mb-4 hide-scrollbar" style="mask-image: linear-gradient(to bottom, transparent, black 10%, black 100%); -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 100%);">
                      <template x-for="(sub, index) in videoSubtitles" :key="index">
                          <div class="animate-fade-in-up w-full flex flex-col">
                              <div x-show="sub.type === 'narration'" class="flex justify-center my-1"><span class="text-gray-300/80 text-[13px] italic bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm" x-text="sub.text"></span></div>
                              <div x-show="sub.type === 'dialogue'" class="flex w-full" :class="sub.speaker === 'Me' ? 'justify-end' : 'justify-start'">
                                  <div class="flex flex-col p-3.5 rounded-2xl shadow-lg w-fit max-w-[85%]" :class="sub.speaker === 'Me' ? 'bg-white/90 rounded-tr-sm items-end' : 'bg-black/50 rounded-tl-sm items-start border border-white/5'">
                                      <p class="text-[15px] font-medium leading-snug text-left" :class="sub.speaker === 'Me' ? 'text-gray-900' : 'text-white'" x-text="sub.original"></p>
                                      <p x-show="sub.translation" class="text-[12px] italic mt-1 text-left" :class="sub.speaker === 'Me' ? 'text-gray-600' : 'text-gray-300'" x-text="sub.translation"></p>
                                  </div>
                              </div>
                          </div>
                      </template>
                      <div x-show="interimTranscript.length > 0" class="w-full flex justify-end">
                          <div class="bg-white/90 flex flex-col p-3.5 rounded-2xl rounded-tr-sm w-fit max-w-[85%] items-end opacity-80">
                              <p class="text-gray-900 text-[15px] font-medium leading-snug text-left" x-text="interimTranscript + '...'"></p>
                          </div>
                      </div>
                  </div>
                  <div x-show="!isTyping && !isListening" class="w-full flex justify-center pointer-events-auto">
                      <button @click="toggleTyping()" class="dark-glass px-4 py-2 rounded-full flex items-center gap-2 text-white/70">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                          <span class="text-[13px]">发送消息...</span>
                      </button>
                  </div>
              </div>
          </div>
          <div class="relative z-10 w-full shrink-0 flex justify-between items-end min-h-[100px]">
              <div x-show="callState === 'active' && !isTyping" class="w-full flex justify-between items-start pt-2">
                  <div class="flex flex-col items-center w-1/3 gap-6">
                      <div class="flex flex-col items-center gap-2 cursor-pointer" @click="toggleMic()">
                          <button class="w-[68px] h-[68px] rounded-full flex items-center justify-center shadow-lg relative" :class="micOn ? 'bg-white text-black' : 'bg-gray-400 text-white'">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8"><rect x="8" y="2" width="8" height="12" rx="4" /><path d="M5 11a7 7 0 0 0 14 0v-1h-2v1a5 5 0 0 1-10 0v-1H5v1z" /><rect x="11" y="17" width="2" height="3" /><rect x="8" y="20" width="8" height="2" rx="1" /></svg>
                              <div x-show="isListening" class="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white recording-dot"></div>
                          </button>
                          <span class="text-white text-[12px] whitespace-nowrap" x-text="micOn ? '麦克风已开' : '麦克风已关'"></span>
                      </div>
                      <button @click="videoSubtitlesOn = !videoSubtitlesOn" class="relative w-14 h-12 flex items-center justify-center mt-1">
                          <div class="absolute top-0 left-0 w-10 h-9 bg-white rounded-xl flex items-center justify-center shadow-md transition-all" :class="videoSubtitlesOn ? 'scale-100 opacity-100' : 'scale-90 opacity-50'">
                              <span class="text-black font-bold text-xl leading-none font-serif" style="margin-bottom: 2px;">A</span>
                              <div class="absolute -bottom-1 left-2 w-2.5 h-2.5 bg-white transform rotate-45 rounded-sm"></div>
                          </div>
                          <div class="absolute bottom-0 right-0 w-9 h-8 bg-[#2c3035] border border-white/20 rounded-lg flex items-center justify-center shadow-lg z-10 transition-all" :class="videoSubtitlesOn ? 'scale-100 opacity-100' : 'scale-90 opacity-50'">
                              <span class="text-white font-bold text-sm leading-none">文</span>
                              <div class="absolute -bottom-1 right-2 w-2 h-2 bg-[#2c3035] border-r border-b border-white/20 transform rotate-45 rounded-sm"></div>
                          </div>
                      </button>
                  </div>
                  <div class="flex flex-col items-center w-1/3 gap-6">
                      <div class="flex flex-col items-center gap-2">
                          <button class="w-[68px] h-[68px] rounded-full flex items-center justify-center shadow-lg bg-white text-black">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg>
                          </button>
                          <span class="text-white text-[12px] whitespace-nowrap">扬声器已开</span>
                      </div>
                      <div class="flex flex-col items-center justify-center mt-1">
                          <button @click="endCall()" class="w-[60px] h-[60px] rounded-full bg-red-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8"><path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clip-rule="evenodd" transform="rotate(135 12 12)" /></svg>
                          </button>
                      </div>
                  </div>
                  <div class="flex flex-col items-center w-1/3 gap-6">
                      <div class="flex flex-col items-center gap-2 cursor-pointer" @click="toggleCamera()">
                          <button class="w-[68px] h-[68px] rounded-full flex items-center justify-center shadow-lg" :class="cameraOn ? 'bg-white text-black' : 'bg-gray-400 text-white'">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8"><rect x="2" y="6" width="13" height="12" rx="3.5" ry="3.5" /><path d="M16 10l5.5-3v10l-5.5-3z" /></svg>
                          </button>
                          <span class="text-white text-[12px] whitespace-nowrap" x-text="cameraOn ? '摄像头已开' : '摄像头已关'"></span>
                      </div>
                      <button @click="switchCamera()" class="w-12 h-12 rounded-full dark-glass flex items-center justify-center mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6 text-white"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
                      </button>
                  </div>
              </div>
              <div x-show="callState === 'active' && isTyping" class="w-full flex items-center gap-3 pb-2">
                  <button @click="toggleTyping()" class="shrink-0 w-10 h-10 rounded-full dark-glass flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                  </button>
                  <div class="flex-1 dark-glass rounded-full flex items-center px-4 h-12">
                      <input type="text" x-ref="textInput" x-model="textMessage" @keydown.enter="sendTextMessage()" placeholder="输入消息..." class="flex-1 bg-transparent text-white text-[15px] outline-none placeholder:text-gray-400">
                  </div>
                  <button @click="sendTextMessage()" class="shrink-0 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center text-gray-900 shadow-lg" :class="!textMessage.trim() ? 'opacity-50' : ''">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
                  </button>
              </div>
              <div x-show="callState === 'calling' || callState === 'receiving'" class="w-full flex justify-center items-center gap-16 pb-8">
                  <div class="flex flex-col items-center gap-2 cursor-pointer" @click="endCall()">
                      <button class="w-[72px] h-[72px] rounded-full bg-red-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-9 h-9"><path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clip-rule="evenodd" transform="rotate(135 12 12)" /></svg>
                      </button>
                      <span class="text-white text-[13px]" x-text="callState === 'receiving' ? '拒绝' : '挂断'"></span>
                  </div>
                  <div x-show="callState === 'receiving'" class="flex flex-col items-center gap-2 cursor-pointer" @click="acceptCall()">
                      <button class="w-[72px] h-[72px] rounded-full bg-green-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(34,197,94,0.5)] animate-bounce">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-9 h-9"><path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clip-rule="evenodd" /></svg>
                      </button>
                      <span class="text-white text-[13px]">接听</span>
                  </div>
              </div>
          </div>
      </div>

      <!-- ================= 最小化悬浮小窗 ================= -->
      <div x-show="callState !== 'idle' && isMinimized" x-transition.opacity class="wet-glass fixed z-[200] w-[90px] h-[120px] rounded-[22px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col items-center justify-end pb-3 cursor-pointer overflow-hidden border-white/60 pip-drag" style="display: none;" :style="\`left: \${pipX}px; top: \${pipY}px;\`" @mousedown="handleDragStart($event)" @touchstart="handleDragStart($event)">
          <div class="absolute top-2.5 left-2.5 w-2.5 h-2.5 rounded-full bg-green-500 border border-white/50 animate-pulse shadow-sm z-20" x-show="callState === 'active'"></div>
          <div class="absolute top-2.5 left-2.5 w-2.5 h-2.5 rounded-full bg-blue-500 border border-white/50 animate-bounce shadow-sm z-20" x-show="callState === 'calling'"></div>
          <div class="w-[56px] h-[56px] rounded-[14px] overflow-hidden shadow-sm border border-white/50 mb-1.5 pointer-events-none relative z-10 bg-gray-800">
              <template x-if="callType === 'voice' || (callType === 'video' && callState !== 'active')">
                  <img src="https://i.ibb.co/3mf7FgyL/IMG-6559.jpg" class="w-full h-full object-cover">
              </template>
              <template x-if="callType === 'video' && callState === 'active'">
                  <div class="relative w-full h-full">
                      <video x-show="cameraOn" x-ref="pipVideoElement" autoplay playsinline muted class="w-full h-full object-cover transform" :class="isFrontCamera ? 'scale-x-[-1]' : ''"></video>
                      <img x-show="!cameraOn" src="https://i.ibb.co/BKtnrG9B/IMG-6557.jpg" class="absolute inset-0 w-full h-full object-cover">
                  </div>
              </template>
          </div>
          <span class="text-gray-800 font-bold text-[11px] font-mono" x-text="callState === 'active' ? callTimer : (callState === 'calling' ? '等待接听' : '来电...')"></span>
      </div>
    `;
  }
}
customElements.define('call-ui', CallUI);
