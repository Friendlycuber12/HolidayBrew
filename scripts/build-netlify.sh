set -eu

rm -rf dist
mkdir -p dist

cp templates/*.html dist/
cp -R static dist/static
