#!/usr/bin/env bash

cp build/index.html $1/resources/views/v3map.blade.php

rm $1/public/static/css/*
cp build/static/css/*.css $1/public/static/css/

rm $1/public/static/js/*
cp build/static/js/*.js $1/public/static/js/

rm $1/public/static/media/*
cp -r build/static/media/* $1/public/static/media/