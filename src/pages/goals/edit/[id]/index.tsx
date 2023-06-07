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
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useFormik, FormikHelpers } from 'formik';
import { getGoalById, updateGoalById } from 'apiSdk/goals';
import { Error } from 'components/error';
import { goalValidationSchema } from 'validationSchema/goals';
import { GoalInterface } from 'interfaces/goal';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { BusinessOrganizationInterface } from 'interfaces/business-organization';
import { getBusinessOrganizations } from 'apiSdk/business-organizations';

function GoalEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<GoalInterface>(
    () => (id ? `/goals/${id}` : null),
    () => getGoalById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: GoalInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateGoalById(id, values);
      mutate(updated);
      resetForm();
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<GoalInterface>({
    initialValues: data,
    validationSchema: goalValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Edit Goal
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {formError && <Error error={formError} />}
        {isLoading || (!formik.values && !error) ? (
          <Spinner />
        ) : (
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'goal',
  operation: AccessOperationEnum.UPDATE,
})(GoalEditPage);
