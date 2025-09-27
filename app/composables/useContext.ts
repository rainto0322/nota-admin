export const useContext = () => {
  const menuMode = ref(false)
  const menuX = ref('');
  const menuY = ref('');

  if (import.meta.client) {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      if (menuMode.value) return;
      menuMode.value = true;
      const clientX = event.clientX,
        clientY = event.clientY,
        windowWidth = document.documentElement.clientWidth,
        windowHeight = document.documentElement.clientHeight;

      if (clientX < (windowWidth / 2)) {
        menuX.value = `left:${clientX}px;`
      } else {
        menuX.value = `right:${windowWidth - clientX}px;`
      }

      if (clientY < (windowHeight / 2)) {
        menuY.value = `top:${clientY}px;`
      } else {
        menuY.value = `bottom:${windowHeight - clientY}px;`
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);

    document.addEventListener('click', (event) => {
      if (menuMode.value === true) menuMode.value = false
    });
	
    // document.oncontextlost
    onUnmounted(() => {
      document.removeEventListener('contextmenu', handleContextMenu);
    });
  }

  return {
    menuMode,
    menuX,
    menuY,
    closeMenu: () => {
      menuMode.value = false;
    }
  };
}
