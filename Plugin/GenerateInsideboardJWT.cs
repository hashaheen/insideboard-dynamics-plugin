using System;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Xrm.Sdk;

namespace InsideboardWidget.Plugins
{
    /// <summary>
    /// Plugin to generate JWT token for Insideboard authentication
    /// Triggered by Custom API: new_GenerateInsideboardJWT
    /// </summary>
    public class GenerateInsideboardJWT : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            // Obtain the tracing service
            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            
            // Obtain the execution context
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            
            try
            {
                tracingService.Trace("GenerateInsideboardJWT: Plugin execution started");
                
                // Get input parameters
                if (!context.InputParameters.Contains("UserEmail") || context.InputParameters["UserEmail"] == null)
                {
                    throw new InvalidPluginExecutionException("UserEmail parameter is required");
                }
                
                if (!context.InputParameters.Contains("SecretKey") || context.InputParameters["SecretKey"] == null)
                {
                    throw new InvalidPluginExecutionException("SecretKey parameter is required");
                }
                
                string userEmail = context.InputParameters["UserEmail"].ToString();
                string secretKey = context.InputParameters["SecretKey"].ToString();
                
                tracingService.Trace($"Generating JWT for user: {userEmail}");
                
                // Generate JWT
                string jwt = GenerateJWT(secretKey, userEmail, tracingService);
                
                tracingService.Trace($"JWT generated successfully, length: {jwt.Length}");
                
                // Set output parameter
                context.OutputParameters["JWT"] = jwt;
                
                tracingService.Trace("GenerateInsideboardJWT: Plugin execution completed successfully");
            }
            catch (Exception ex)
            {
                tracingService.Trace($"GenerateInsideboardJWT: Exception - {ex.Message}");
                throw new InvalidPluginExecutionException($"Error generating JWT: {ex.Message}", ex);
            }
        }
        
        /// <summary>
        /// Generates JWT token using HMAC-SHA256
        /// Matches Salesforce implementation exactly
        /// </summary>
        private string GenerateJWT(string secret, string userEmail, ITracingService tracingService)
        {
            try
            {
                // Create JWT header
                string header = "{\"alg\":\"HS256\",\"typ\":\"JWT\"}";
                string encodedHeader = Base64UrlEncode(Encoding.UTF8.GetBytes(header));
                
                tracingService.Trace("JWT header encoded");
                
                // Create JWT payload (only sub and exp, matching Salesforce)
                long exp = DateTimeOffset.UtcNow.ToUnixTimeSeconds() + 3600; // 1 hour expiration
                string payload = $"{{\"sub\":\"{userEmail}\",\"exp\":{exp}}}";
                string encodedPayload = Base64UrlEncode(Encoding.UTF8.GetBytes(payload));
                
                tracingService.Trace($"JWT payload encoded, expiration: {exp}");
                
                // Create signature input
                string signatureInput = $"{encodedHeader}.{encodedPayload}";
                
                // Generate HMAC-SHA256 signature
                byte[] secretBytes = Encoding.UTF8.GetBytes(secret);
                using (var hmac = new HMACSHA256(secretBytes))
                {
                    byte[] signatureBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(signatureInput));
                    string encodedSignature = Base64UrlEncode(signatureBytes);
                    
                    tracingService.Trace("JWT signature generated");
                    
                    // Return complete JWT
                    return $"{signatureInput}.{encodedSignature}";
                }
            }
            catch (Exception ex)
            {
                tracingService.Trace($"Error in GenerateJWT: {ex.Message}");
                throw;
            }
        }
        
        /// <summary>
        /// Base64 URL encoding (RFC 4648)
        /// </summary>
        private string Base64UrlEncode(byte[] input)
        {
            string base64 = Convert.ToBase64String(input);
            // Convert to base64url format
            return base64.Replace('+', '-').Replace('/', '_').TrimEnd('=');
        }
    }
}
