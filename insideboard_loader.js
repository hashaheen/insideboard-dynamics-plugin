/**
 * Insideboard Widget Loader for Dynamics 365 Sales
 * Version: Enterprise - Custom API with Server-Side JWT Generation
 */

var InsideboardLoader = (function() {
    'use strict';
    
    var config = {
        instance: null,
        widgetCode: null,
        scriptUrl: null
    };
    
    function loadInstanceFromEnvVar() {
        return new Promise(function(resolve, reject) {
            var req = new XMLHttpRequest();
            req.open('GET', '/api/data/v9.2/environmentvariabledefinitions?$filter=schemaname eq \'new_insideboard_instance\'&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)', true);
            req.setRequestHeader('OData-MaxVersion', '4.0');
            req.setRequestHeader('OData-Version', '4.0');
            req.setRequestHeader('Accept', 'application/json');
            
            req.onreadystatechange = function() {
                if (this.readyState === 4) {
                    req.onreadystatechange = null;
                    if (this.status === 200) {
                        try {
                            var result = JSON.parse(this.response);
                            if (result.value && result.value.length > 0) {
                                var envVar = result.value[0];
                                if (envVar.environmentvariabledefinition_environmentvariablevalue && 
                                    envVar.environmentvariabledefinition_environmentvariablevalue.length > 0) {
                                    config.instance = envVar.environmentvariabledefinition_environmentvariablevalue[0].value;
                                    config.scriptUrl = 'https://' + config.instance + '.insideboard.com/insideboard.js';
                                    resolve(config.instance);
                                    return;
                                }
                            }
                            reject(new Error('Instance not found'));
                        } catch (e) {
                            reject(new Error('Failed to parse instance: ' + e.message));
                        }
                    } else {
                        reject(new Error('Failed to fetch instance'));
                    }
                }
            };
            
            req.send();
        });
    }
    
    function loadWidgetCodeFromEnvVar() {
        return new Promise(function(resolve, reject) {
            var req = new XMLHttpRequest();
            req.open('GET', '/api/data/v9.2/environmentvariabledefinitions?$filter=schemaname eq \'new_insideboard_widgetcode\'&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)', true);
            req.setRequestHeader('OData-MaxVersion', '4.0');
            req.setRequestHeader('OData-Version', '4.0');
            req.setRequestHeader('Accept', 'application/json');
            
            req.onreadystatechange = function() {
                if (this.readyState === 4) {
                    req.onreadystatechange = null;
                    if (this.status === 200) {
                        try {
                            var result = JSON.parse(this.response);
                            if (result.value && result.value.length > 0) {
                                var envVar = result.value[0];
                                if (envVar.environmentvariabledefinition_environmentvariablevalue && 
                                    envVar.environmentvariabledefinition_environmentvariablevalue.length > 0) {
                                    resolve(envVar.environmentvariabledefinition_environmentvariablevalue[0].value);
                                    return;
                                }
                            }
                            reject(new Error('Widget code not found'));
                        } catch (e) {
                            reject(new Error('Failed to parse widget code'));
                        }
                    } else {
                        reject(new Error('Failed to fetch widget code'));
                    }
                }
            };
            
            req.send();
        });
    }
    
    function getSecretKeyFromEnvVar() {
        return new Promise(function(resolve, reject) {
            var req = new XMLHttpRequest();
            req.open('GET', '/api/data/v9.2/environmentvariabledefinitions?$filter=schemaname eq \'new_insideboard_secretkey\'&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)', true);
            req.setRequestHeader('OData-MaxVersion', '4.0');
            req.setRequestHeader('OData-Version', '4.0');
            req.setRequestHeader('Accept', 'application/json');
            
            req.onreadystatechange = function() {
                if (this.readyState === 4) {
                    req.onreadystatechange = null;
                    if (this.status === 200) {
                        try {
                            var result = JSON.parse(this.response);
                            if (result.value && result.value.length > 0) {
                                var envVar = result.value[0];
                                if (envVar.environmentvariabledefinition_environmentvariablevalue && 
                                    envVar.environmentvariabledefinition_environmentvariablevalue.length > 0) {
                                    resolve(envVar.environmentvariabledefinition_environmentvariablevalue[0].value);
                                    return;
                                }
                            }
                            reject(new Error('Secret key not found'));
                        } catch (e) {
                            reject(new Error('Failed to parse secret key'));
                        }
                    } else {
                        reject(new Error('Failed to fetch secret key'));
                    }
                }
            };
            
            req.send();
        });
    }
    
    function getUserEmail() {
        try {
            if (typeof Xrm !== 'undefined' && Xrm.Utility && Xrm.Utility.getGlobalContext) {
                var userSettings = Xrm.Utility.getGlobalContext().userSettings;
                var userId = userSettings.userId.replace(/[{}]/g, '');
                
                var req = new XMLHttpRequest();
                req.open('GET', '/api/data/v9.2/systemusers(' + userId + ')?$select=internalemailaddress', false);
                req.setRequestHeader('OData-MaxVersion', '4.0');
                req.setRequestHeader('OData-Version', '4.0');
                req.setRequestHeader('Accept', 'application/json');
                req.send();
                
                if (req.status === 200) {
                    var result = JSON.parse(req.responseText);
                    if (result.internalemailaddress) {
                        return result.internalemailaddress;
                    }
                }
                
                return userSettings.userName;
            }
            
            return null;
        } catch (e) {
            console.error('Error retrieving user email:', e);
            return null;
        }
    }
    
    function generateJWTViaCustomAPI(userEmail, secretKey) {
        return new Promise(function(resolve, reject) {
            console.log('🔐 Calling Custom API to generate JWT...');
            
            var req = new XMLHttpRequest();
            req.open('POST', '/api/data/v9.2/new_GenerateInsideboardJWT', true);
            req.setRequestHeader('OData-MaxVersion', '4.0');
            req.setRequestHeader('OData-Version', '4.0');
            req.setRequestHeader('Accept', 'application/json');
            req.setRequestHeader('Content-Type', 'application/json');
            
            req.onreadystatechange = function() {
                if (this.readyState === 4) {
                    req.onreadystatechange = null;
                    if (this.status === 200) {
                        try {
                            var result = JSON.parse(this.response);
                            if (result.JWT) {
                                console.log('✅ JWT generated via Custom API');
                                resolve(result.JWT);
                            } else {
                                reject(new Error('JWT not found in response'));
                            }
                        } catch (e) {
                            reject(new Error('Failed to parse JWT response'));
                        }
                    } else {
                        reject(new Error('Custom API call failed: ' + this.statusText));
                    }
                }
            };
            
            req.send(JSON.stringify({
                UserEmail: userEmail,
                SecretKey: secretKey
            }));
        });
    }
    
    function loadInsideboardScript(jwt) {
        try {
            if (!jwt) {
                console.error('❌ JWT token is required');
                return;
            }
            
            var targetWindow = window;
            var targetDocument = document;
            
            if (window !== window.top) {
                try {
                    if (window.parent && window.parent.document) {
                        targetWindow = window.parent;
                        targetDocument = window.parent.document;
                    }
                } catch (e) {}
            }
            
            var originalFetch = targetWindow.fetch;
            targetWindow.fetch = function() {
                var url = arguments[0];
                if (url && typeof url === 'object' && url.href) {
                    url = url.href;
                    arguments[0] = url;
                }
                return originalFetch.apply(this, arguments);
            };
            
            (function(w, d, s, o, widgetCode, token) {
                w[o] = w[o] || function() {
                    (w[o].q = w[o].q || []).push(arguments);
                };
                
                var js = d.createElement(s);
                js.id = o;
                js.src = config.scriptUrl + '?id=' + widgetCode;
                js.async = 1;
                
                js.onload = function() {
                    console.log('✅ Insideboard script loaded, authenticating...');
                    w[o]('init', {
                        apiHost: 'https://' + config.instance + '.insideboard.com',
                        widgetCode: widgetCode
                    });
                    w[o]('authenticate', token);
                    w[o]('setConfig', { isAnimationEnabled: true });
                    console.log('✅ Insideboard widget initialized successfully');
                };
                
                js.onerror = function(error) {
                    console.error('❌ Failed to load Insideboard script:', error);
                };
                
                d.head.appendChild(js);
            })(targetWindow, targetDocument, 'script', 'ib', config.widgetCode, jwt);
            
        } catch (error) {
            console.error('❌ Error loading Insideboard:', error);
        }
    }
    
    function init() {
        console.log('🔵 Insideboard widget initializing (Custom API version)...');
        
        getUserEmail().then(function(userEmail) {
            loadInstanceFromEnvVar().then(function(instance) {
                loadWidgetCodeFromEnvVar().then(function(widgetCode) {
                    config.instance = instance;
                    config.widgetCode = widgetCode;
                    
                    getSecretKeyFromEnvVar().then(function(secretKey) {
                        return generateJWTViaCustomAPI(userEmail, secretKey);
                    }).then(function(jwt) {
                        console.log('✅ Configuration loaded, initializing widget...');
                        loadInsideboardScript(jwt);
                    }).catch(function(error) {
                        console.error('❌ Failed to initialize:', error);
                    });
                }).catch(function(error) {
                    console.error('❌ Error loading widget code:', error);
                });
            }).catch(function(error) {
                console.error('❌ Error loading instance:', error);
            });
        }).catch(function(error) {
            console.error('❌ Error getting user email:', error);
        });
    }
    
    return { init: init };
})();

var isInitialized = false;
function initOnce() {
    if (isInitialized) return;
    isInitialized = true;
    InsideboardLoader.init();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOnce);
} else {
    setTimeout(initOnce, 100);
}

console.log('🔵 Insideboard Loader initialized (Custom API version)');
