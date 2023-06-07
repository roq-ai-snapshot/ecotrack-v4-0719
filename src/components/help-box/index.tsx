import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Business Owner'];
  const roles = ['Business Owner', 'Sustainability Manager', 'Waste Management Officer', 'Admin', 'Employee'];
  const applicationName = 'EcoTrack v4';
  const tenantName = 'Business Organization';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `Role: Business Owner

1. As a business owner, I want to be able to create an account for my organization on the platform so that I can start monitoring our environmental impact.
2. As a business owner, I want to be able to invite my team members to join the platform so that they can contribute to our organization's environmental data management.
3. As a business owner, I want to be able to view a dashboard of our organization's carbon footprint, waste management, and sustainable practices so that I can make informed decisions about our environmental strategy.
4. As a business owner, I want to be able to set goals for our organization's environmental performance so that we can work towards becoming more sustainable.
5. As a business owner, I want to be able to generate reports on our organization's environmental data so that I can share our progress with stakeholders.

Role: Sustainability Manager

1. As a sustainability manager, I want to be able to input data on our organization's carbon emissions, waste production, and sustainable practices so that we can track our progress over time.
2. As a sustainability manager, I want to be able to view a dashboard of our organization's environmental performance so that I can identify areas for improvement.
3. As a sustainability manager, I want to be able to collaborate with other team members on the platform so that we can work together to improve our organization's environmental performance.
4. As a sustainability manager, I want to be able to access resources and best practices for sustainable business operations so that I can implement them in our organization.

Role: Waste Management Officer

1. As a waste management officer, I want to be able to input data on our organization's waste production and disposal methods so that we can track our progress in reducing waste.
2. As a waste management officer, I want to be able to view a dashboard of our organization's waste management performance so that I can identify areas for improvement.
3. As a waste management officer, I want to be able to collaborate with other team members on the platform so that we can work together to improve our organization's waste management practices.

Role: Admin

1. As an admin, I want to be able to manage user accounts and permissions for our organization on the platform so that I can ensure the right people have access to the right information.
2. As an admin, I want to be able to customize the platform's settings and features to best suit our organization's needs so that we can get the most value from the platform.
3. As an admin, I want to be able to troubleshoot and resolve any technical issues that arise with the platform so that our organization can continue to use it effectively.

Role: Employee (not a member of the Business Organization)

1. As an employee, I want to be able to access resources and best practices for sustainable living so that I can make more environmentally friendly choices in my personal life.
2. As an employee, I want to be able to view a dashboard of my organization's environmental performance so that I can understand the impact of my workplace on the environment.
3. As an employee, I want to be able to provide feedback and suggestions on how my organization can improve its environmental performance so that I can contribute to our overall sustainability efforts.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="20px" bottom="20px" zIndex={3}>
      <Popover placement="top">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody maxH="400px" overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application. Feel free to remove this tutorial with the{' '}
              <Box as="span" bg="yellow.300" p={1}>
                NEXT_PUBLIC_SHOW_BRIEFING
              </Box>{' '}
              environment variable.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
