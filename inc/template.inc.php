<?php

chdir(dirname(__FILE__));
define('ROOT_DIR', dirname(dirname(__FILE__) . "../"));
define('TEMPLATE_DIR', ROOT_DIR . '/template');

function getView($templateName, $vars) {
    $loader = new Twig_Loader_Filesystem(TEMPLATE_DIR);
    $twig   = new Twig_Environment($loader);
    return $twig->render($templateName, $vars);
}
