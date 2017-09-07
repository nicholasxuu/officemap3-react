<?php
require_once '../../phpfaker/Faker/src/autoload.php';

$file = file_get_contents('../public/mockApi/config.json');

$json = json_decode($file, true);

$faker = Faker\Factory::create();

foreach ($json['locations'] as &$location) {
	if ($location['category'] === '/workspace') {
		$location['name'] = $faker->name;
		$location['brief'] = $faker->jobTitle;
		$location['description'] = $faker->jobTitle;
		$location['image'] = '/img/portrait/panda.png';
	}
}

file_put_contents('../public/mockApi/config.json', json_encode($json, JSON_PRETTY_PRINT));