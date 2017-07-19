#!/usr/bin/env bash -f

# stop on error
set -e

# debug
set -x

if [ ! $1 ]; then
	echo "destination not defined";
	exit 0;
fi

destinationRootDir="$1"

export appPath="$(cd "$(dirname "${0##*/}")"; pwd -P)"

# build production
if [ ! -f ${appPath}/build/index.html ]; then
	npm run build
fi

if [ -f ${appPath}/bin/temp.html ]; then
	rm ${appPath}/bin/temp.html
fi

scp ${appPath}/build/index.html ${destinationRootDir}/resources/views/v3map.blade.php

mv ${appPath}/build/index.html ${appPath}/bin/temp.html

scp -r ${appPath}/build/* ${destinationRootDir}/public/

mv ${appPath}/bin/temp.html ${appPath}/build/index.html