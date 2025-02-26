// Create a new file to fix the countdown timer issue

// This function will be called from the browser console
export function fixTimers() {
  // Get all market IDs from the DOM
  const marketElements = document.querySelectorAll('[data-market-id]');
  const marketIds = Array.from(marketElements).map(el => 
    el.getAttribute('data-market-id')
  );
  
  // Set up a timer to update the countdown displays
  setInterval(() => {
    // Find all timer elements
    const timerElements = document.querySelectorAll('[data-timer]');
    
    // Update each timer
    timerElements.forEach(el => {
      const current = parseInt(el.textContent || '0');
      if (!isNaN(current) && current > 0) {
        el.textContent = (current - 1).toString();
      }
    });
  }, 1000);
  
  console.log('Timer fix applied!');
}

// Export a function to reset all timers
export function resetAllTimers() {
  // Find all timer elements
  const timerElements = document.querySelectorAll('[data-timer]');
  
  // Reset each timer to 60 seconds
  timerElements.forEach(el => {
    el.textContent = '60';
  });
  
  console.log('All timers reset to 60 seconds!');
}

// Auto-run the fix when this module is loaded
if (typeof window !== 'undefined') {
  // Wait for the DOM to be fully loaded
  window.addEventListener('DOMContentLoaded', () => {
    // Apply the timer fix
    fixTimers();
    
    // Add a button to reset all timers
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset All Timers';
    resetButton.style.position = 'fixed';
    resetButton.style.bottom = '20px';
    resetButton.style.left = '20px';
    resetButton.style.zIndex = '1000';
    resetButton.style.padding = '8px 16px';
    resetButton.style.backgroundColor = '#9c27b0';
    resetButton.style.color = 'white';
    resetButton.style.border = 'none';
    resetButton.style.borderRadius = '4px';
    resetButton.style.cursor = 'pointer';
    
    // Add click handler
    resetButton.addEventListener('click', resetAllTimers);
    
    // Add to the document
    document.body.appendChild(resetButton);
  });
} 