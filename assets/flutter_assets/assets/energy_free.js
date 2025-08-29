/**
 * Energy Free Purchase Script
 * Makes all energy/turn purchases cost 0 diamonds
 */

(function() {
    'use strict';
    
    console.log('[ENERGY_FREE] Script loaded - Making energy purchases free!');
    
    // Store original functions
    const originalFunctions = {};
    
    // Function to intercept and modify the buyTurn function
    function interceptBuyTurn() {
        // Find the APIMgr instance
        if (window.apis && window.apis.buyTurn) {
            // Store original function
            originalFunctions.buyTurn = window.apis.buyTurn;
            
            // Replace with free version
            window.apis.buyTurn = function() {
                console.log('[ENERGY_FREE] Intercepted buyTurn call - Making it free!');
                
                // Return a promise that resolves with free energy
                return new Promise((resolve) => {
                    // Simulate the same response structure but with 0 diamond cost
                    const freeResponse = {
                        success: true,
                        result: {
                            diamond: 0,  // 0 diamond cost
                            amountTurn: 100,  // Give 100 turns for free
                            cost: 0  // No cost
                        },
                        code: "SUCCESS",
                        message: "Buy turn successfully - FREE!"
                    };
                    
                    console.log('[ENERGY_FREE] Returning free energy response:', freeResponse);
                    resolve(freeResponse);
                });
            };
            
            console.log('[ENERGY_FREE] Successfully intercepted buyTurn function');
        } else {
            console.log('[ENERGY_FREE] APIMgr not found yet, retrying...');
            setTimeout(interceptBuyTurn, 1000);
        }
    }
    
    // Function to intercept the APIMgr class methods
    function interceptAPIMgr() {
        // Look for the APIMgr class in the global scope
        if (window.APIMgr && window.APIMgr.Instance) {
            const apiMgr = window.APIMgr.Instance;
            
            if (apiMgr.buyTurn) {
                // Store original function
                originalFunctions.APIMgrBuyTurn = apiMgr.buyTurn;
                
                // Replace with free version
                apiMgr.buyTurn = function() {
                    console.log('[ENERGY_FREE] Intercepted APIMgr.buyTurn call - Making it free!');
                    
                    return new Promise((resolve) => {
                        const freeResponse = {
                            success: true,
                            result: {
                                diamond: 0,
                                amountTurn: 100,
                                cost: 0
                            },
                            code: "SUCCESS",
                            message: "Buy turn successfully - FREE!"
                        };
                        
                        console.log('[ENERGY_FREE] Returning free energy response:', freeResponse);
                        resolve(freeResponse);
                    });
                };
                
                console.log('[ENERGY_FREE] Successfully intercepted APIMgr.buyTurn function');
            }
        }
    }
    
    // Function to intercept any buyTurn calls in the global scope
    function interceptGlobalBuyTurn() {
        // Override any global buyTurn function
        if (window.buyTurn) {
            originalFunctions.globalBuyTurn = window.buyTurn;
            
            window.buyTurn = function() {
                console.log('[ENERGY_FREE] Intercepted global buyTurn call - Making it free!');
                
                return new Promise((resolve) => {
                    const freeResponse = {
                        success: true,
                        result: {
                            diamond: 0,
                            amountTurn: 100,
                            cost: 0
                        },
                        code: "SUCCESS",
                        message: "Buy turn successfully - FREE!"
                    };
                    
                    console.log('[ENERGY_FREE] Returning free energy response:', freeResponse);
                    resolve(freeResponse);
                });
            };
            
            console.log('[ENERGY_FREE] Successfully intercepted global buyTurn function');
        }
    }
    
    // Function to make all energy-related purchases free
    function makeEnergyFree() {
        console.log('[ENERGY_FREE] Making all energy purchases free...');
        
        // Intercept different possible locations
        interceptBuyTurn();
        interceptAPIMgr();
        interceptGlobalBuyTurn();
        
        // Also try to find and intercept any energy purchase UI elements
        setTimeout(() => {
            // Look for energy purchase buttons and make them free
            const energyButtons = document.querySelectorAll('[class*="energy"], [class*="turn"], [class*="buy"]');
            energyButtons.forEach(button => {
                if (button.textContent && (button.textContent.includes('Buy') || button.textContent.includes('Energy') || button.textContent.includes('Turn'))) {
                    console.log('[ENERGY_FREE] Found energy-related button:', button);
                    // You can add additional logic here if needed
                }
            });
        }, 2000);
    }
    
    // Function to restore original functions
    function restoreOriginalFunctions() {
        console.log('[ENERGY_FREE] Restoring original functions...');
        
        if (originalFunctions.buyTurn && window.apis) {
            window.apis.buyTurn = originalFunctions.buyTurn;
        }
        
        if (originalFunctions.APIMgrBuyTurn && window.APIMgr && window.APIMgr.Instance) {
            window.APIMgr.Instance.buyTurn = originalFunctions.APIMgrBuyTurn;
        }
        
        if (originalFunctions.globalBuyTurn) {
            window.buyTurn = originalFunctions.globalBuyTurn;
        }
        
        console.log('[ENERGY_FREE] Original functions restored');
    }
    
    // Main initialization
    function init() {
        console.log('[ENERGY_FREE] Initializing energy free script...');
        
        // Try to intercept immediately
        makeEnergyFree();
        
        // Also try after a delay to catch late-loaded functions
        setTimeout(makeEnergyFree, 2000);
        setTimeout(makeEnergyFree, 5000);
        
        // Set up periodic checking
        setInterval(makeEnergyFree, 10000);
    }
    
    // Wait for page to load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Also try when window loads
    window.addEventListener('load', init);
    
    // Expose functions globally for manual control
    window.EnergyFree = {
        enable: makeEnergyFree,
        disable: restoreOriginalFunctions,
        status: () => console.log('[ENERGY_FREE] Script is active and monitoring energy purchases')
    };
    
    console.log('[ENERGY_FREE] Script fully loaded! Use window.EnergyFree.enable() or window.EnergyFree.disable() to control manually.');
    
})();
