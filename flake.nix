{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/21.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShell = pkgs.mkShell {
          buildInputs = [
            pkgs.nodejs-16_x
            pkgs.nodePackages.gatsby-cli
          ];
        };
      });
}
