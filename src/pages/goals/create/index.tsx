import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createGoal } from 'apiSdk/goals';
import { Error } from 'components/error';
import { goalValidationSchema } from 'validationSchema/goals';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { BusinessOrganizationInterface } from 'interfaces/business-organization';
import { getBusinessOrganizations } from 'apiSdk/business-organizations';
import { GoalInterface } from 'interfaces/goal';

function GoalCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: GoalInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createGoal(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<GoalInterface>({
    initialValues: {
      carbon_footprint_goal: 0,
      waste_reduction_goal: 0,
      sustainable_practices_goal: 0,
      created_at: new Date(new Date().toDateString()),
      updated_at: new Date(new Date().toDateString()),
      business_organization_id: (router.query.business_organization_id as string) ?? null,
    },
    validationSchema: goalValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Goal
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="carbon_footprint_goal" mb="4" isInvalid={!!formik.errors?.carbon_footprint_goal}>
            <FormLabel>Carbon Footprint Goal</FormLabel>
            <NumberInput
              name="carbon_footprint_goal"
              value={formik.values?.carbon_footprint_goal}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('carbon_footprint_goal', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.carbon_footprint_goal && (
              <FormErrorMessage>{formik.errors?.carbon_footprint_goal}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl id="waste_reduction_goal" mb="4" isInvalid={!!formik.errors?.waste_reduction_goal}>
            <FormLabel>Waste Reduction Goal</FormLabel>
            <NumberInput
              name="waste_reduction_goal"
              value={formik.values?.waste_reduction_goal}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('waste_reduction_goal', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.waste_reduction_goal && (
              <FormErrorMessage>{formik.errors?.waste_reduction_goal}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl id="sustainable_practices_goal" mb="4" isInvalid={!!formik.errors?.sustainable_practices_goal}>
            <FormLabel>Sustainable Practices Goal</FormLabel>
            <NumberInput
              name="sustainable_practices_goal"
              value={formik.values?.sustainable_practices_goal}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('sustainable_practices_goal', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.sustainable_practices_goal && (
              <FormErrorMessage>{formik.errors?.sustainable_practices_goal}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl id="created_at" mb="4">
            <FormLabel>Created At</FormLabel>
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              selected={formik.values?.created_at}
              onChange={(value: Date) => formik.setFieldValue('created_at', value)}
            />
          </FormControl>
          <FormControl id="updated_at" mb="4">
            <FormLabel>Updated At</FormLabel>
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              selected={formik.values?.updated_at}
              onChange={(value: Date) => formik.setFieldValue('updated_at', value)}
            />
          </FormControl>
          <AsyncSelect<BusinessOrganizationInterface>
            formik={formik}
            name={'business_organization_id'}
            label={'Select Business Organization'}
            placeholder={'Select Business Organization'}
            fetcher={getBusinessOrganizations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'goal',
  operation: AccessOperationEnum.CREATE,
})(GoalCreatePage);
