echo 'Starting to Deploy...'
ssh -i ${ticket-crm-system.pem} ubuntu@ec2-107-23-73-19.compute-1.amazonaws.com
        cd app/ticket_crm 
        sudo make stop-production
        echo 'Stoped docker containers'
        echo 'Started docker containers'
        sudo make run-production
        "
echo 'Deployment completed successfully'
