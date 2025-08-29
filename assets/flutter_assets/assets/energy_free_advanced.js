/**
 * Advanced Energy Free Purchase Script
 * Specifically targets the APIMgr class structure found in the game
 * Makes all energy/turn purchases cost 0 diamonds
 */

(function() {
    'use strict';
    
    console.log('[ENERGY_FREE_ADVANCED] Advanced script loaded - Making energy purchases free!');
    
    // Store original functions
    const originalFunctions = {};
    
    // Function to find and intercept the APIMgr class
    function interceptAPIMgrClass() {
        // Look for the APIMgr class in the global scope
        if (window.APIMgr && window.APIMgr.Instance) {
            const apiMgr = window.APIMgr.Instance;
            
            if (apiMgr.buyTurn) {
                // Store original function
                originalFunctions.APIMgrBuyTurn = apiMgr.buyTurn;
                
                // Replace with free version
                apiMgr.buyTurn = function() {
                    console.log('[ENERGY_FREE_ADVANCED] Intercepted APIMgr.buyTurn call - Making it free!');
                    
                    // Check if this is debug mode
                    if (this.isDebug) {
                        console.log('[ENERGY_FREE_ADVANCED] Debug mode detected, using debug response');
                        return Promise.resolve({
                            success: true,
                            result: {
                                diamond: 100300,  // Keep original diamond amount
                                amountTurn: 9938,  // Keep original turn amount
                                cost: 0  // But make cost 0
                            },
                            code: "SUCCESS",
                            message: "Buy turn successfully - FREE!"
                        });
                    }
                    
                    // For non-debug mode, return free energy
                    return new Promise((resolve) => {
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
                        
                        console.log('[ENERGY_FREE_ADVANCED] Returning free energy response:', freeResponse);
                        resolve(freeResponse);
                    });
                };
                
                console.log('[ENERGY_FREE_ADVANCED] Successfully intercepted APIMgr.buyTurn function');
                return true;
            }
        }
        return false;
    }
    
    // Function to intercept the window.apis object
    function interceptWindowApis() {
        if (window.apis && window.apis.buyTurn) {
            // Store original function
            originalFunctions.windowApisBuyTurn = window.apis.buyTurn;
            
            // Replace with free version
            window.apis.buyTurn = function() {
                console.log('[ENERGY_FREE_ADVANCED] Intercepted window.apis.buyTurn call - Making it free!');
                
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
                    
                    console.log('[ENERGY_FREE_ADVANCED] Returning free energy response:', freeResponse);
                    resolve(freeResponse);
                });
            };
            
            console.log('[ENERGY_FREE_ADVANCED] Successfully intercepted window.apis.buyTurn function');
            return true;
        }
        return false;
    }
    
    // Function to intercept the getGameApis function
    function interceptGetGameApis() {
        if (window.getGameApis) {
            // Store original function
            originalFunctions.getGameApis = window.getGameApis;
            
            // Replace with modified version
            window.getGameApis = function() {
                console.log('[ENERGY_FREE_ADVANCED] Intercepted getGameApis call');
                
                // Call original function first
                const originalApis = originalFunctions.getGameApis.call(this);
                
                // If it returns an object with buyTurn, intercept it
                if (originalApis && originalApis.buyTurn) {
                    // Store original
                    originalFunctions.originalApisBuyTurn = originalApis.buyTurn;
                    
                    // Replace with free version
                    originalApis.buyTurn = function() {
                        console.log('[ENERGY_FREE_ADVANCED] Intercepted getGameApis.buyTurn call - Making it free!');
                        
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
                            
                            console.log('[ENERGY_FREE_ADVANCED] Returning free energy response:', freeResponse);
                            resolve(freeResponse);
                        });
                    };
                    
                    console.log('[ENERGY_FREE_ADVANCED] Successfully intercepted getGameApis.buyTurn function');
                }
                
                return originalApis;
            };
            
            console.log('[ENERGY_FREE_ADVANCED] Successfully intercepted getGameApis function');
            return true;
        }
        return false;
    }
    
    // Function to intercept any buyTurn calls in the global scope
    function interceptGlobalBuyTurn() {
        if (window.buyTurn) {
            originalFunctions.globalBuyTurn = window.buyTurn;
            
            window.buyTurn = function() {
                console.log('[ENERGY_FREE_ADVANCED] Intercepted global buyTurn call - Making it free!');
                
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
                    
                    console.log('[ENERGY_FREE_ADVANCED] Returning free energy response:', freeResponse);
                    resolve(freeResponse);
                });
            };
            
            console.log('[ENERGY_FREE_ADVANCED] Successfully intercepted global buyTurn function');
            return true;
        }
        return false;
    }
    
    // Function to intercept the specific APIMgr prototype method
    function interceptAPIMgrPrototype() {
        // Look for the APIMgr class in the require system
        if (window.__require) {
            // Try to find the APIMgr module
            const modules = window.__require.c || {};
            for (let moduleId in modules) {
                if (modules[moduleId] && modules[moduleId].exports) {
                    const module = modules[moduleId].exports;
                    if (module && module.default && module.default.prototype && module.default.prototype.buyTurn) {
                        console.log('[ENERGY_FREE_ADVANCED] Found APIMgr module:', moduleId);
                        
                        // Store original function
                        originalFunctions.moduleBuyTurn = module.default.prototype.buyTurn;
                        
                        // Replace with free version
                        module.default.prototype.buyTurn = function() {
                            console.log('[ENERGY_FREE_ADVANCED] Intercepted module.buyTurn call - Making it free!');
                            
                            // Check if this is debug mode
                            if (this.isDebug) {
                                console.log('[ENERGY_FREE_ADVANCED] Debug mode detected, using debug response');
                                return Promise.resolve({
                                    success: true,
                                    result: {
                                        diamond: 100300,
                                        amountTurn: 9938,
                                        cost: 0
                                    },
                                    code: "SUCCESS",
                                    message: "Buy turn successfully - FREE!"
                                });
                            }
                            
                            // For non-debug mode, return free energy
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
                                
                                console.log('[ENERGY_FREE_ADVANCED] Returning free energy response:', freeResponse);
                                resolve(freeResponse);
                            });
                        };
                        
                        console.log('[ENERGY_FREE_ADVANCED] Successfully intercepted module.buyTurn function');
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    // Function to make all energy-related purchases free
    function makeEnergyFree() {
        console.log('[ENERGY_FREE_ADVANCED] Making all energy purchases free...');
        
        let intercepted = 0;
        
        // Try all interception methods
        if (interceptAPIMgrClass()) intercepted++;
        if (interceptWindowApis()) intercepted++;
        if (interceptGetGameApis()) intercepted++;
        if (interceptGlobalBuyTurn()) intercepted++;
        if (interceptAPIMgrPrototype()) intercepted++;
        
        console.log(`[ENERGY_FREE_ADVANCED] Intercepted ${intercepted} buyTurn functions`);
        
        // Also try to find and intercept any energy purchase UI elements
        setTimeout(() => {
            const energyButtons = document.querySelectorAll('[class*="energy"], [class*="turn"], [class*="buy"]');
            energyButtons.forEach(button => {
                if (button.textContent && (button.textContent.includes('Buy') || button.textContent.includes('Energy') || button.textContent.includes('Turn'))) {
                    console.log('[ENERGY_FREE_ADVANCED] Found energy-related button:', button);
                }
            });
        }, 2000);
    }
    
    // Function to restore original functions
    function restoreOriginalFunctions() {
        console.log('[ENERGY_FREE_ADVANCED] Restoring original functions...');
        
        if (originalFunctions.APIMgrBuyTurn && window.APIMgr && window.APIMgr.Instance) {
            window.APIMgr.Instance.buyTurn = originalFunctions.APIMgrBuyTurn;
        }
        
        if (originalFunctions.windowApisBuyTurn && window.apis) {
            window.apis.buyTurn = originalFunctions.windowApisBuyTurn;
        }
        
        if (originalFunctions.getGameApis) {
            window.getGameApis = originalFunctions.getGameApis;
        }
        
        if (originalFunctions.globalBuyTurn) {
            window.buyTurn = originalFunctions.globalBuyTurn;
        }
        
        if (originalFunctions.moduleBuyTurn && window.__require) {
            // Restore module function (this is more complex and may need specific handling)
            console.log('[ENERGY_FREE_ADVANCED] Note: Module function restoration may need manual handling');
        }
        
        console.log('[ENERGY_FREE_ADVANCED] Original functions restored');
    }
    
    // Main initialization
    function init() {
        console.log('[ENERGY_FREE_ADVANCED] Initializing advanced energy free script...');
        
        // Try to intercept immediately
        makeEnergyFree();
        
        // Also try after delays to catch late-loaded functions
        setTimeout(makeEnergyFree, 1000);
        setTimeout(makeEnergyFree, 3000);
        setTimeout(makeEnergyFree, 5000);
        setTimeout(makeEnergyFree, 10000);
        
        // Set up periodic checking
        setInterval(makeEnergyFree, 15000);
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
    window.EnergyFreeAdvanced = {
        enable: makeEnergyFree,
        disable: restoreOriginalFunctions,
        status: () => console.log('[ENERGY_FREE_ADVANCED] Advanced script is active and monitoring energy purchases'),
        test: () => {
            console.log('[ENERGY_FREE_ADVANCED] Testing energy purchase...');
            if (window.APIMgr && window.APIMgr.Instance && window.APIMgr.Instance.buyTurn) {
                window.APIMgr.Instance.buyTurn().then(result => {
                    console.log('[ENERGY_FREE_ADVANCED] Test result:', result);
                });
            } else {
                console.log('[ENERGY_FREE_ADVANCED] APIMgr not available for testing');
            }
        }
    };
    
    console.log('[ENERGY_FREE_ADVANCED] Advanced script fully loaded!');
    console.log('[ENERGY_FREE_ADVANCED] Use window.EnergyFreeAdvanced.enable() or window.EnergyFreeAdvanced.disable() to control manually.');
    console.log('[ENERGY_FREE_ADVANCED] Use window.EnergyFreeAdvanced.test() to test the free energy purchase.');
    
})();
