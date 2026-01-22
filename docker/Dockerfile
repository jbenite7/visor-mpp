FROM php:8.2-apache

# Instalar dependencias del sistema y extensiones PHP
RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip \
    && docker-php-ext-install zip

# Habilitar mod_rewrite
RUN a2enmod rewrite

# Ajustar permisos (opcional, útil para desarrollo)
RUN chown -R www-data:www-data /var/www/html
