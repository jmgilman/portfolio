{ pkgs, ... }:

{
  cachix.enable = false;

  packages = with pkgs; [
    git
  ];

  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_20;

    npm = {
      enable = true;
      install.enable = true;
    };
  };

  languages.typescript.enable = true;

  scripts.lint.exec = "eslint .";
  scripts.format.exec = "prettier --write .";
  scripts."format:check".exec = "prettier --check .";
  scripts.typecheck.exec = "astro check && tsc --noEmit";

  enterShell = ''
    echo "Node $(node --version) | npm $(npm --version)"
  '';
}
