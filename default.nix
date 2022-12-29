{ pkgs ? import <nixpkgs> { }, ... }:

let
  packages = with pkgs; [
    nodejs-18_x
    yarn
    typescript
    nodePackages.typescript-language-server
  ];
in
pkgs.stdenv.mkDerivation {
  name = "typeslang";
  buildInputs = packages;
}
