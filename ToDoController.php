<?php


namespace Controller;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Map2u\Manifold\MapsBundle\Classes\DefaultMethods;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use TCPDF;

/**
 * ToDo controller.
 *
 * @Route("/todo")
 */
class ToDoController extends Controller
{
    /**
     *
     * @Route("/", name="todo_index", options={"expose"=true})
     * @Method("GET")
     * @Template()
     * @param Request $request
     * @return array|RedirectResponse
     */
    public function indexAction(Request $request)
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->redirectToRoute("fos_user_security_login");
        }

        
        $conn = $this->get('database_connection');
        $route = $request->get('route');
        $data_to_return = array('route' => $route);

        switch ($route) {
            case 'index':
                // Fetch markets
                $markets_sql = 'select distinct market_city, market_province from markets_table order by market_province,market_city';
                $markets = $conn->fetchAll($markets_sql);
                $data_to_return = array('route' => $route, 'markets' => $markets);
                break;
            case 'todo':
                break;
        }

        return $data_to_return;
    }

    /**
     *
     * @Route("/", name="todo_todo", options={"expose"=true})
     * @Method("GET")
     * @Template()
     * @param Request $request
     * @return array|RedirectResponse
     */
    public function todoAction(Request $request)
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->redirectToRoute("fos_user_security_login");
        }

        return array();
    }

    /**
     *
     * @Route("/todo_reducer", name="todo_todo_reducer", options={"expose"=true})
     * @Method("GET|POST")
     * @Template()
     * @param Request $request
     * @return array|RedirectResponse
     */
    public function todo_reducerAction(Request $request)
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->redirectToRoute("fos_user_security_login");
        }

        $conn = $this->get('database_connection');
        $todos = $conn->fetchAll("select * from point_e7119ea0_713d_4f0f_b965_17198d792979");

        return new JsonResponse(array("todos" => $todos));
    }

}