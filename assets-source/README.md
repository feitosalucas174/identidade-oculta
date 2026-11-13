# Animações — fluxo de atualização

## Gabriel Elias

O arquivo corrigido deve ser enviado para:

`public/assets/gabriel_elias_editor.webp`

**Não envie a versão nova para `docs/assets`.** A pasta `docs` é a saída gerada pelo Vite e é reconstruída a cada publicação.

Antes do build, o script `scripts/assemble-gabriel-animation.mjs` verifica se o WebP direto existe em `public/assets`. Quando existe, ele:

- preserva o arquivo enviado, sem reconstruí-lo a partir dos Base64 antigos;
- valida o contêiner WebP e a quantidade de oito quadros;
- verifica o ritmo de 220 ms por quadro, igual ao das animações da equipe.

O Vite copia automaticamente `public/assets` para `docs/assets` durante `npm run build`. O workflow de GitHub Pages publica a pasta `docs` depois que a alteração chega à branch `master`.

Os arquivos Base64 antigos permanecem apenas como fallback temporário, para que builds antigos não parem antes da substituição do WebP direto.
