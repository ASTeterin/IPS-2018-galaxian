<?php
require_once("inc/common.inc.php");

$vars = getTopResult();

echo getView('records.html.twig', $vars);
