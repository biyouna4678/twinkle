document.addEventListener('alpine:init', () => {
    Alpine.data('mapManager', () => ({
        showLocationModal: false,
        showLocationDetail: false,
        newLocation: { name: '', subtitle: '', address: '' },
        selectedLocation: null,
        
        sendLocation() {
            if(!this.newLocation.name.trim() && !this.newLocation.subtitle.trim() && !this.newLocation.address.trim()) {
                this.newLocation.name = '未命名地点';
            }
            const now = new Date();
            const timeStr = `今天 ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            
            this.messages.push({
                id: Date.now(),
                type: 'location',
                sender: 'me',
                data: { ...this.newLocation },
                time: timeStr
            });
            
            this.showLocationModal = false;
            this.scrollToBottom();

            setTimeout(() => { this.newLocation = { name: '', subtitle: '', address: '' }; }, 300);
        }
    }));
});