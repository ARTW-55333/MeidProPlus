# Energy Free Purchase Scripts

## Overview

These scripts make energy/turn purchases cost 0 diamonds in the mini game app. They intercept the `buyTurn` function in the APIMgr class and replace it with a version that returns free energy.

## What They Do

- **Intercept Energy Purchases**: Catch all calls to buy energy/turns
- **Make Purchases Free**: Return 0 diamond cost for energy purchases
- **Maintain Game Structure**: Keep the same response format but with free energy
- **Multiple Interception Points**: Target different locations where the function might be called
- **Easy Control**: Can be enabled/disabled at runtime

## Files Included

1. **`energy_free.js`** - Basic version for general use
2. **`energy_free_advanced.js`** - Advanced version specifically targeting the APIMgr class
3. **`test_energy_free.html`** - Test page to verify scripts work
4. **`README_ENERGY_FREE.md`** - This documentation

## Installation

### Method 1: Direct Script Inclusion

Include the script in your HTML before the game scripts:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Mini Game</title>
</head>
<body>
    <!-- Load energy free script BEFORE game scripts -->
    <script src="energy_free_advanced.js"></script>
    
    <!-- Your game scripts here -->
    <script src="game.js"></script>
    <script src="indat3.js"></script>
</body>
</html>
```

### Method 2: Dynamic Loading

Load the script after the game has loaded:

```javascript
// Wait for game to load
window.addEventListener('load', function() {
    // Load the energy free script
    const script = document.createElement('script');
    script.src = 'energy_free_advanced.js';
    document.head.appendChild(script);
});
```

### Method 3: Inline Integration

Copy the script content directly into your main game file:

```javascript
// Paste the energy free script content here
// ... (script content)
```

## How It Works

### 1. Function Interception

The script finds and intercepts the `buyTurn` function in multiple locations:

```javascript
// Original function (found in indat3.js)
buyTurn: function() {
    return this.isDebug ? 
        Promise.resolve({...}) : 
        this.apis.buyTurn();
}

// Intercepted version
buyTurn: function() {
    console.log('Making energy purchase free!');
    return Promise.resolve({
        success: true,
        result: {
            diamond: 0,        // 0 diamond cost
            amountTurn: 100,   // 100 free turns
            cost: 0           // No cost
        },
        code: "SUCCESS",
        message: "Buy turn successfully - FREE!"
    });
}
```

### 2. Multiple Interception Points

The script targets several possible locations:

- `window.APIMgr.Instance.buyTurn`
- `window.apis.buyTurn`
- `window.getGameApis().buyTurn`
- `window.buyTurn` (global scope)
- Module system functions

### 3. Automatic Detection

The script automatically detects and intercepts functions as they become available:

```javascript
// Try to intercept immediately
makeEnergyFree();

// Also try after delays to catch late-loaded functions
setTimeout(makeEnergyFree, 1000);
setTimeout(makeEnergyFree, 3000);
setTimeout(makeEnergyFree, 5000);

// Set up periodic checking
setInterval(makeEnergyFree, 15000);
```

## Usage

### Basic Usage

Once loaded, the script works automatically. No additional configuration needed.

### Manual Control

You can control the script manually using the global functions:

```javascript
// Enable the script
window.EnergyFreeAdvanced.enable();

// Disable the script
window.EnergyFreeAdvanced.disable();

// Check status
window.EnergyFreeAdvanced.status();

// Test the free energy purchase
window.EnergyFreeAdvanced.test();
```

### Console Commands

Open the browser console and use these commands:

```javascript
// Check if script is loaded
console.log(window.EnergyFreeAdvanced);

// Enable/disable
window.EnergyFreeAdvanced.enable();
window.EnergyFreeAdvanced.disable();

// Test
window.EnergyFreeAdvanced.test();
```

## Testing

### 1. Load the Test Page

Open `test_energy_free.html` in your browser to test the scripts.

### 2. Check Console Logs

Look for these messages in the browser console:

```
[ENERGY_FREE_ADVANCED] Script loaded - Making energy purchases free!
[ENERGY_FREE_ADVANCED] Successfully intercepted APIMgr.buyTurn function
[ENERGY_FREE_ADVANCED] Intercepted buyTurn call - Making it free!
```

### 3. Test Energy Purchase

Try to buy energy in the game. You should see:

- No diamond cost deducted
- Energy/turns added for free
- Console logs showing the interception

## Configuration

### Customizing Energy Amount

To change how many turns are given for free, modify the response in the script:

```javascript
// In the intercepted function
const freeResponse = {
    success: true,
    result: {
        diamond: 0,
        amountTurn: 200,  // Change this to give more/fewer turns
        cost: 0
    },
    code: "SUCCESS",
    message: "Buy turn successfully - FREE!"
};
```

### Debug Mode Handling

The script handles both debug and production modes:

```javascript
// Check if this is debug mode
if (this.isDebug) {
    console.log('Debug mode detected, using debug response');
    return Promise.resolve({
        success: true,
        result: {
            diamond: 100300,  // Keep original diamond amount
            amountTurn: 9938,  // Keep original turn amount
            cost: 0           // But make cost 0
        },
        code: "SUCCESS",
        message: "Buy turn successfully - FREE!"
    });
}
```

## Troubleshooting

### Script Not Working

1. **Check Console Errors**: Look for JavaScript errors in the browser console
2. **Script Loading Order**: Ensure the script loads before the game scripts
3. **Function Availability**: The game functions might not be loaded yet
4. **Multiple Scripts**: Don't load both basic and advanced scripts together

### Common Issues

1. **"APIMgr not found"**: The game hasn't loaded yet, script will retry automatically
2. **"Function already intercepted"**: Script is working, this is normal
3. **No console logs**: Check if the script file loaded correctly

### Debug Mode

Enable debug logging by checking the browser console for detailed information about what the script is doing.

## Security and Ethics

### Important Notes

- **Educational Purpose**: These scripts are for learning and understanding game mechanics
- **Fair Play**: Always respect game rules and terms of service
- **Testing Only**: Use for testing purposes, not for cheating in live games
- **Reversible**: All changes can be easily undone using the disable functions

### Responsible Use

- Test in development environments only
- Don't use in production or live games
- Respect the game developers' work
- Use for educational purposes

## Technical Details

### Function Structure

The original `buyTurn` function structure:

```javascript
buyTurn: function() {
    return this.isDebug ? 
        Promise.resolve({
            success: true,
            result: {
                diamond: 100300,
                amountTurn: 9938
            },
            code: "SUCCESS",
            message: "Buy turn successfully"
        }) : 
        this.apis.buyTurn();
}
```

### Interception Method

The script uses function replacement:

```javascript
// Store original
originalFunctions.buyTurn = originalFunction.buyTurn;

// Replace with modified version
originalFunction.buyTurn = function() {
    // Modified logic here
    return modifiedResponse;
};
```

### Response Format

The script maintains the exact same response format:

```javascript
{
    success: true,
    result: {
        diamond: 0,        // Modified: 0 cost
        amountTurn: 100,   // Modified: 100 free turns
        cost: 0           // Added: explicit cost field
    },
    code: "SUCCESS",
    message: "Buy turn successfully - FREE!"  // Modified message
}
```

## Support

### Getting Help

1. **Check Console Logs**: Look for error messages and status updates
2. **Test Page**: Use the provided test page to verify functionality
3. **Browser Compatibility**: Test in different browsers
4. **Script Order**: Ensure proper loading order

### Reporting Issues

When reporting issues, include:

- Browser and version
- Console error messages
- Game version
- Steps to reproduce
- Expected vs actual behavior

## License

This script is provided as-is for educational purposes. Use responsibly and in accordance with game terms of service.

---

**Remember**: This script is designed to help understand game mechanics and for educational purposes. Always respect game rules and use responsibly.
