## PID

Interaktivní aplikace na zobrazování odjezdů a příjezdů Pražské Integrované Dopravy

# Data

Data jsou poskytnuta projektem Golemio, viz. https://api.golemio.cz/v2/pid/docs/openapi

# Prostředí

Pro sebehostování je třeba mít .env následující typu

GOLEM_API_KEY='api_key' // Vlastní api_key lze získat zdarma na https://api.golemio.cz/api-keys
REDIS_KEY='redis://(user_name):key@url' // Redis caching, poskytnuto zdarma na Upstash
