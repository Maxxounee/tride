cd ..
pathProject=$(cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd)
me=$(basename "${0%.*}")
echo "${pathProject}, ${me}"
cd "../project-node/node/${me}"
node --max-old-space-size=32768 --inspect index ${pathProject}