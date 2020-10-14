# What is the Twelve-Factor App Methodology?

The Twelve-Factor App Methodology is suggested by developers for smoothly working and delivering Software as a Service (SaaS) Applications or Web Apps with a focus on Microservices. It consists of 12 factors which are

  # * **Codebase**:
        An application codebase should always be tracked by a Version Control System (VCS). It provides substantial benefits such as code tracking and code versioning while also easing the collaboration of a development team working on the same application.
    
  # * **Dependencies**:
        For any application you should not copy any dependencies to the project codebase, rather use dependency management tools to get the required project dependencies, declared in manifest, from the server.

  # * **Backing Services**:
        Backing services refer to the infrastructure and other services by which the application communicates over the network. Database, Message Brokers, other API-accessible consumer services such as Authorization Service, Twitter, GitHub etc., are loosely coupled with the application and treat them as resource.

  # * **Config**:
        Configurations are a central part of any application, specifically when there is a need to support multiple environments or clients. Use cases are as follows:
            · Database connection properties
            · Backing services credentials and connection information
            · Application environment specific information such as Host IP, Port, etc.

  # * **Build, Release, Run**:
        A twelve-factor application requires a strict separation between Build, Release and Run stages.
        Build
            -The Build phase takes code from VCS and builds an executable bundle. Ideally, this stage should also take care of executing all Unit Tests available in an application. If tests fail, then the    entire process should be abandoned as you don’t want a failing application deployed.
        Release
            -In this stage, an executable build is combined with environment specific configurations, assigned a unique release number, and made ready to execute on the environment.
        Run
            -Finally, the package is executed on an environment using the necessary execution commands. 

  # * **Processes**:
        This factor is focused on executing the app as one or more stateless processes. A Process is an application running on server. An Application can be deployed with multiple instances/processes depending upon the network traffic. Generally, a load balancer is used to manage traffic and route to an app instance, which enables quick request handling.

  # * **Port Binding**:
        Unlike some web apps that are executed inside a webserver container, a Twelve-Factor acts as a standalone service and is self contained meaning it doesn’t rely on any existing/running application server to get executed.

  # * **Concurrency**:
        Concurrency is a bit redundant with the Process factor, but the key point is that because of Processes, Concurrency is simple and reliable. Here are some guidelines for Concurrency:
            · Don’t rely too much on threads in an application as vertical scaling can be limited for process running on server
            · Adhere to Process guidelines to achieve Horizontal Scaling
    
# * **Disposability**:
        Disposability is about keeping HTTP requests short which sometimes is not possible. In the case of WebSocket connections, if data is streamed continuously to the client, and the connection is lost, this adds responsibility on the client to seamlessly attempt to reconnect.

# * **Dev/Prod Parity**:
        Twelve-factor applications are designed for continuous deployments by keeping less gaps between production and development environments. This is done to avoid unforeseen issues once an application goes live when the app was working fine on the development environment.

# * **Logs**:
        Twelve-factor apps should not be concerned about routing and storage of it’s output stream or writing/managing logfiles — the app will write it’s event stream to stdout.

# * **Admin Processes**:
        Twelve-factor apps aim to run admin/management tasks as one-off processes — tasks like database migration or executing one-off scripts in the environment. This seems ok if it’s really a one-off task but what if your database migration is a periodic task and you need to handle it with schedulers and perform it automatically.

